var url = 'ws://localhost:8000',
    ws = new WebSocket(url),
	serverService = {
        connect : function (connHandler, msgHandler, closeHandler) {
			ws.onopen = function () {
				connHandler();
			};
			
			ws.onmessage = function (msg) {
				msgHandler(msg.data);
			};
			
			ws.onclose = function () {
				closeHandler();
			};
		},
		
		send : function (type, uid, value) {
			var msg;
			if (value) {
				if (typeof(value) === "number" || value.charAt(0) === "{") {
					msg = '{"type":"' + type + '", "uid":' + uid + ', "value":' + value + '}';
				} else {
					msg = '{"type":"' + type + '", "uid":' + uid + ', "value":"' + value + '"}';
				}
			} else {
				msg = '{"type":"' + type + '", "uid":' + uid + '}';
			}
			ws.send(msg);
		}
	};
