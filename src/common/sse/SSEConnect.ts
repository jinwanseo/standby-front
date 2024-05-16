import {EventListenerOrEventListenerObject, EventSourcePolyfill} from "event-source-polyfill";


class SSEConnect {
    eventSource : EventSourcePolyfill | null = null;
    private static instance: SSEConnect = new SSEConnect();

    static getInstance() {
        return this.instance;
    }

    public close() {
        this.eventSource && this.eventSource.close();
        this.eventSource = null;
    }


    public connect(customerId: string) {
        // TODO 연결여부 확인
        this.eventSource = new EventSourcePolyfill(
            `http://localhost:8080/sse/${customerId}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNzE1NjM5OTA2LCJleHAiOjE3MTU3MjYzMDZ9.pUKq5rvWhwZ4WaGsm_V8SRsKuhv6GbKbwUMqnom55oc`
                },
                heartbeatTimeout: 1000 * 60 * 60 * 24 * 365 * 1000,
            }
        );



        this.eventSource.onopen = () => {
            console.log('start server fetching...');
        };

        this.eventSource.onerror = (event) => {
            this.eventSource && this.eventSource.close();
            if (event.target.readyState === EventSource.CLOSED) {
                console.log(customerId)
                setTimeout(() => this.connect(customerId), 1000);
            }
        };
    }

    public addEventListener(type: string, listener: EventListenerOrEventListenerObject): void {
        this.eventSource!.addEventListener(type, listener);
    }
}

export default SSEConnect;