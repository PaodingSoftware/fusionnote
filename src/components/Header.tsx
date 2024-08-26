import { useAppDispatch, useAppSelector } from "../hooks";
import { determineDockingStatus } from "../slices/dockSlice";

function Header({ displayName, pageIndex }: { displayName: string, pageIndex: number }) {
    const dispatch = useAppDispatch();

    const isDocked = useAppSelector((state) => state.dock.isDocked);

    const handleAttachClick = function () {
        (window as any).paoding.attachDockableWindow({
            "location": "right",
            "width": 500
        });
        dispatch(determineDockingStatus);
    }

    const handleDetachClick = function () {
        (window as any).paoding.detachDockableWindow();
        dispatch(determineDockingStatus);
    }

    return (
        <section className="section pt-4 pb-1">
            <div className="container">
                <div className="fixed-grid has-4-cols">
                    <div className="grid">
                        <div className="cell is-col-span-4">
                            <h5 className="title is-5">{displayName}</h5>
                        </div>
                        <div className="cell is-col-from-end-1">
                            <button className="button is-small is-static mr-1">
                                <span className="icon is-small">
                                    <i className="fas fa-thumbtack"></i>
                                </span>
                                <span>第 {pageIndex + 1} 页</span>
                            </button>
                            <button
                                className="button is-small"
                                onClick={isDocked ? handleDetachClick : handleAttachClick}
                            >
                                <span className="icon is-small">
                                    <i className={"fas " + (isDocked ? "fa-link-slash" : "fa-link")}></i>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Header;