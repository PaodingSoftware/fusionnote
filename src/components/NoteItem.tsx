import path from "path-browserify";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeNote } from "../slices/notesSlice";

function parseFilePath(url: string) {
    if (url == "about:blank" || !url) {
        return "";
    }
    let path = new URL(url).pathname;
    return path.substring(path.indexOf('/') + 1);
}

function NoteItem({ id, caption, content, content_type, created_at }:
    { id: string, caption: string, content: string, content_type: string, created_at: number }) {
    const dispatch = useAppDispatch()

    const filePath = parseFilePath(useAppSelector((state) => state.location.filePath))

    const handleDeleteClick = () => {
        dispatch(removeNote(id));
    }

    const handleLinkClick = (e: any) => {
        chrome.tabs.create({
            url: e.target.dataset.url
        });
    }

    const handleCodeLinkClick = (e: any) => {
        if (!filePath) {
            return;
        }
        const parentPath = path.dirname(filePath);
        const baseName = path.basename(filePath);
        const relativePath = new URL(e.target.dataset.url).pathname;
        const resultDirPath = path.join(parentPath, baseName);
        const resultFilePath = path.join(resultDirPath, relativePath);
        (window as any).paoding.dispatchEvent({
            "event_id": "SendToPythonInterpreter",
            "event_args": [
                {
                    "dirPath": resultDirPath,
                    "filePath": resultFilePath
                }
            ]
        });
    }

    let contentElement = <>{content}</>
    if (content_type == 'link') {
        contentElement = <a
            href="#"
            data-url={content}
            onClick={handleLinkClick}>
            {content}
        </a>
    } else if (content_type == 'code') {
        contentElement = <a
            href="#"
            data-url={content}
            onClick={handleCodeLinkClick}>
            {content}
        </a>
    }

    let colorClassName = "";
    if (content_type == 'link') {
        colorClassName = "is-success";
    } else if (content_type == 'code') {
        colorClassName = "is-info";
    }

    return (
        <div className="cell">
            <article className={"message is-small " + colorClassName}>
                <div className="message-header">
                    <p>{caption}</p>
                    <button
                        className="delete"
                        aria-label="delete"
                        onClick={handleDeleteClick}
                    ></button>
                </div>
                <div className="message-body">
                    {contentElement}
                </div>
            </article>
        </div>
    );
}

export default NoteItem;