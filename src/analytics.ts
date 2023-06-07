import axios from "axios";
import * as os from "os";
import { randomUUID } from "crypto";

export default async function sendEvent(eventName: string) {
    let username, platform, ip, id;
    try {
        username = os.userInfo().username || "unknown";
        platform = os.platform() || "android";
        const { data } = await axios.get("https://ipapi.co/json/");
        ip = data.ip ? data.ip : "";
        id = randomUUID();
    } catch (error) {
        return;
    }

    const events = [
        {
            event: eventName,
            properties: {
                time: Math.floor(Date.now() / 1000),
                distinct_id: id,
                $insert_id: id,
                ip,
                ip_address: ip,
                username,
                platform,
            },
        },
    ];

    await axios.post("https://api.mixpanel.com/import", events, {
        params: { strict: "1" },
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
                `e08c23081bc53eb34aae7a5fdda686c0:`
            ).toString("base64")}`,
        },
    });
}
