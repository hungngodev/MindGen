Anh gởi đề tài nhé:

Chủ đề: WebApp tương tác với LLM để tạo ra mindmap cơ bản từ chủ đề user cung cấp.

Kỹ thuật cần:

1. Front-end: NextJS, Tailwind CSS
2. Backend: API, sử dụng FastAPI (Python), hoặc Slim Framework PHP, chưa cần cơ chế Authentication
3. LLMs: tương tác với OpenAI api

Kiến thức:

- Hiểu biết về Front-end, Backend
- Cơ chế hoạt động của LLM
- Prompt Engineering

Mô tả kỹ thuật
Gởi input cho AI, nhận lại output mindmap
Sử dụng PlanUML để tạo hình mindmap với output từ AI, ví dụ: https://shorturl.at/j9BZ5
ReactJS Canvas via Konva, hiển thị hình mindmap, có drag, zoom in/out.
Cho edit lại nội dung mindmap và update lại hình mindmap

Mô tả flow:
HIển thị 1 input, user nhập: Plan a marketing campaign for a new board game mobile app in the Philippines. Include considerations about key messages, success metrics, and possible channels.
Bấm nút Generate
Gọi AI, trả về nội dung, generate ra hình MindMap, hiển thị trên Canvas

Nội dung chatGPT cho UI: https://chatgpt.com/share/994ec635-4ac4-4584-a033-e915d3b682fd
Anh note lại bổ sung thêm thêm phần lưu database nhé.
Mình sẽ cần tối thiểu 2 table, 1 chứa data input, 1 chứa log request (số token, cost,…)

todo:
login system
map auto completioin
UI change heading , navbar, more
