paoding.addEventListener({
    "is_user_scope": false,
    "is_once_callback": false,
    "event_id": "Startup",
    "handler": function () {
        paoding.newDockedWindow({
            "url": "https://fanyi.baidu.com/#auto/zh/",
            "location": "left",
            "width": 400,
            "user_agent_override": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
        });

        paoding.newWebWindow({
            "url": chrome.runtime.getURL("index.html"),
            "title": "联合笔记",
            "width": 500,
            "height": 600,
            "show_title": true,
            "center_in_window": true,
            "can_resize": true,
            "can_minimize": true,
            "can_maximize": true,
            "dockable_window": true,
            "reusable_window": true
        });

        // Enable Python
        paoding.launchPythonInterpreter({});
    }
});

function parseFileIdentifier(url) {
    if (url == "about:blank" || !url) {
        return "about:blank";
    }
    let path = new URL(url).pathname;
    return path.substring(path.lastIndexOf('/') + 1);
}

paoding.addEventListener({
    "is_user_scope": true,
    "is_once_callback": false,
    "event_id": "PDF_VIEWER_MOST_VISIBLE_PAGE_CHANGED",
    "handler": function (e) {
        if (chrome.storage) {
            chrome.storage.local.set({
                "location": {
                    "id": parseFileIdentifier(e.originalUrl) + ":" + e.pageIndex,
                    "originalUrl": e.originalUrl,
                    "pageIndex": e.pageIndex
                }
            });
        }
    }
});

paoding.addEventListener({
    "is_user_scope": true,
    "is_once_callback": false,
    "event_id": "PDF_VIEWER_TEXT_SELECTION_CHANGED",
    "handler": function (selectedText) {
        paoding.dispatchEvent({
            "event_id": "TranslateTextChanged",
            "event_args": [
                selectedText
            ]
        })
    }
});

// Only allow sending messages from within a ServiceWorker.
paoding.addEventListener({
    "is_user_scope": true,
    "is_once_callback": false,
    "event_id": "SendToPythonInterpreter",
    "handler": function (data) {
        paoding.sendToPythonInterpreter(data);
    }
});
