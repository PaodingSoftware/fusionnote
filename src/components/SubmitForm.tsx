import { useAppDispatch, useAppSelector } from '../hooks';
import { addNote, NoteState } from '../slices/notesSlice';
import { setCaption, setContent } from '../slices/submitFormSlice'
import { v4 } from 'uuid'

function parseContentType(content: string) {
    const lowerContent = content.toLowerCase().trim();
    if (lowerContent.startsWith('http://') || lowerContent.startsWith('https://')) {
        return 'link';
    } else if (lowerContent.startsWith('code://')) {
        return 'code';
    } else {
        return 'plain';
    }
}

function SubmitForm() {
    const caption = useAppSelector((state) => state.submitForm.caption)
    const content = useAppSelector((state) => state.submitForm.content)

    const dispatch = useAppDispatch()

    const handleSubmit = () => {
        if (!caption && !content) {
            return;
        }

        const content_type = parseContentType(content);

        const note: NoteState = {
            id: v4(),
            caption: caption,
            content: content,
            content_type: content_type,
            created_at: new Date().getTime(),
        };
        dispatch(addNote(note));

        dispatch(setCaption(''));
        dispatch(setContent(''));
    }

    return (
        <div className="fixed-grid has-1-cols">
            <div className="grid">
                <div className="cell">
                    <div className="field is-grouped">
                        <p className="control is-expanded">
                            <input
                                className="input is-small"
                                type="text"
                                placeholder="请输入标题"
                                onChange={event => dispatch(setCaption(event.target.value))}
                                value={caption}
                            />
                        </p>
                        <p className="control">
                            <button
                                className="button is-small is-info"
                                onClick={handleSubmit}
                            >
                                <span className="icon is-small">
                                    <i className="fas fa-pen-nib"></i>
                                </span>
                                <span>提交</span>
                            </button>
                        </p>
                    </div>
                    <div className="field">
                        <div className="control">
                            <textarea
                                rows={5}
                                className="textarea is-small"
                                placeholder="请输入内容（支持 https://、code://、纯文本）"
                                onChange={event => dispatch(setContent(event.target.value))}
                                value={content}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubmitForm;