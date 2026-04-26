import requests
import json
import math
import time
from pathlib import Path

# ======================
# 配置区
# ======================
MID = 278761367          # ✅ UP 主 UID
PS = 50
DATA_FILE = Path("videos.json")
URL = "https://api.bilibili.com/x/space/wbi/arc/search"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/123.0.0.0 Safari/537.36"
    )
}

# ======================
# 工具函数
# ======================
def load_existing():
    if DATA_FILE.exists():
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save(videos):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(videos, f, ensure_ascii=False, indent=2)

def fetch_new_videos(mid, latest_created, existing_bvids):
    params = {
        "mid": mid,
        "pn": 1,
        "ps": PS,
        "order": "pubdate",
        "platform": "web",
        "web_location": 1550101
    }

    new_videos = []

    resp = requests.get(URL, params=params, headers=HEADERS).json()
    total = resp["data"]["page"]["count"]
    pages = math.ceil(total / PS)

    for pn in range(1, pages + 1):
        params["pn"] = pn
        data = requests.get(URL, params=params, headers=HEADERS).json()

        for v in data["data"]["list"]["vlist"]:
            # 已抓取过的直接跳过
            if v["bvid"] in existing_bvids:
                continue

            # 时间戳早于或等于最新本地记录，说明可以停止
            if v["created"] <= latest_created:
                return new_videos

            new_videos.append({
                "bvid": v["bvid"],      # ✅ BV id
                "title": v["title"],
                "created": v["created"],
                "aid": v["aid"]
            })

        time.sleep(0.3)  # 防风控

    return new_videos

# ======================
# 主逻辑
# ======================
def main():
    existing = load_existing()
    existing_bvids = {v["bvid"] for v in existing}
    latest_created = max((v["created"] for v in existing), default=0)

    print(f"Latest local timestamp: {latest_created}")

    new_videos = fetch_new_videos(
        MID,
        latest_created,
        existing_bvids
    )

    if not new_videos:
        print("No new videos.")
        return

    print(f"Found {len(new_videos)} new videos.")

    all_videos = new_videos + existing
    all_videos.sort(key=lambda x: x["created"], reverse=True)

    save(all_videos)

if __name__ == "__main__":
    main()
