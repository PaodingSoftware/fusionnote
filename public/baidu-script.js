paoding.addEventListener({
	"is_user_scope": true,
	"is_once_callback": false,
	"event_id": "TranslateTextChanged",
	"handler": function (text) {
		if (text && text.length > 0) {
			window.location.href = "https://fanyi.baidu.com/#auto/zh/" + text;
		}
	}
})