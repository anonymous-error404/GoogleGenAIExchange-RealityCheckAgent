# 🌐 RealityCheck AI – Combatting Misinformation with Generative AI 🤖

> ⚡ **RealityCheck AI** is a next-gen **Generative AI–powered tool** that detects, analyzes, and counters misinformation in **real time**.  
> 🛡️ Unlike traditional fact-checking websites, our solution integrates **directly inside social media platforms** – giving users instant, **context-aware fact-checking and awareness** without leaving their feed.

---

## 📌 Overview  

Misinformation spreads faster than truth ⚡ and fuels chaos in society.  
**RealityCheck AI** is built to **stop misinformation at its source** by combining **LLMs, real-time data, caching, and education**.  

✅ Detects fake/misleading posts instantly  
✅ Explains *why* the content is flagged  
✅ Educates users about misinformation patterns  
✅ Works directly *within the platforms where fake news spreads most*  

🎯 Our mission: Create a **smarter, safer, and more resilient digital society** 🌍  

---

## 🌟 Unique Selling Proposition (USP) ✨  

- 🔗 **Seamless In-App Integration** → Directly inside social media apps (Twitter/X, Instagram, WhatsApp).  
- 🧠 **Context-Aware Intelligence** → Detects manipulation, tone, and framing (not just keywords).  
- 📚 **Educational + Preventive** → Explains why content is false and builds user awareness.  
- 🌐 **Dual Data Verification** → Combines real-time trusted web sources + historical misinformation datasets.  
- ⚡ **High-Performance Design** → Multi-layer caching ensures **speed and scalability**.  
- 🌍 **Multilingual & Culturally Adaptive** → Works across languages and geographies.  
- 🖼️ **Future Ready** → Extendable to deepfakes, images, and video misinformation.  

💡 *In one line:*  
**RealityCheck AI empowers users with truth – detecting, explaining, and teaching them about misinformation in real time.**

---

## 🛠️ Features 🚀  

- 🔹 **In-App Fact-Checking** – Validate posts inside the feed itself.  
- 🔹 **Contextual AI Analysis** – Goes beyond keywords; understands framing & intent.  
- 🔹 **Optimized APIs** – Lightweight and lightning fast ⚡.  
- 🔹 **Multi-Layer Caching**  
  - 🗂️ *Content Cache* → Stores analyzed posts.  
  - 🧩 *Context Cache* → Stores semantic understanding.  
- 🔹 **Real-Time Web Scraping** 🌐 – Fetches trusted news and fact-checks.  
- 🔹 **Dynamic Knowledge Base** 📚 – Constantly learns from new misinformation.  
- 🔹 **Explanatory Alerts** ⚠️ – Tells users *why* something is flagged.  
- 🔹 **Awareness Module** 🧠 – Educates with real-world misinformation cases.  
- 🔹 **Multilingual Support** 🌍 – Breaks barriers across languages.  

---

### Images 
<img src="Images/Screenshot (788).png" width="500"><img src="Images/Screenshot (789).png" width="500">
<img src="Images/Screenshot (790).png" width="500"><img src="Images/Screenshot (791).png" width="500">

---

## 🔄 Process Flow 🔁  

Here’s how **RealityCheck AI** works:  

1️⃣ User sees a post in their feed.  
2️⃣ **Redis Cache** checks if it was already analyzed.  
3️⃣ If new → **Gemini LLM** performs context-aware fact-checking.  
4️⃣ **Python Web Scraper** pulls real-time data from trusted portals (WHO, news, govt).  
5️⃣ **Supabase Vector Store** matches with historical misinformation cases.  
6️⃣ Output generated:  
   - ✅ Verified True  
   - ⚠️ Misleading/False  
   - ❗ Needs Caution  
7️⃣ User gets **explanation + educational note** ✨  

📊 **Flowchart :**  
![Process Flow](Assets/Flowchart.gif)  

---

## 🏗️ System Architecture 🖥️  

RealityCheck AI is built with a **layered architecture** for performance and scalability:  

- 🎨 **Frontend (React.js + Vite + TS Demo App)** → Demo feed UI with flagged posts.  
- ⚙️ **Backend (Node.js + Express.js + MongoDB APIs & NoSQL DB)** → Orchestrates AI, caching, and scraping.
- 🧠 **AI Layer (Gemini LLM)** → Detects misinformation contextually.  
- 🗂️ **Knowledge & Storage Layer**  
  - Supabase → Vector DB for embeddings.  
  - Redis → Multi-layer caching (content + context).  
- 🌐 **Data Sources** → Real-time scraping + historical misinformation datasets.  
- 📦 **Deployment Layer** → Docker containers on Google Cloud / AWS.  

📊 **Architecture Diagram :**  

![Architecture](Assets/Architecture.gif)  

---

## ⚙️ Tech Stack 🛠️  

- **Frontend:** React.js + Vite + Typescript (Demo App)
- **Backend:** Node.js + Express.js + MongoDB (API orchestration & NoSQL Database)
- **AI Engine:** Gemini LLM (Google Cloud AI) 🤖  
- **Vector Database:** Supabase  
- **Caching:** Redis (multi-layer)  
- **Data Pipeline:** Python (web scraping engine) 🐍  
- **Deployment:** Docker + Render + vite + Github + Cloud  

---

## 📈 Impact & Future Scope 🌍  

### 🌟 Immediate Impact  
- Reduces the spread of **fake news** ⚠️  
- Prevents scams, unrest, and misinformation-driven crises 🛡️  
- Builds **digital literacy & resilience** 🧠  

### 🚀 Scalability  
- Works across **multiple platforms** (Twitter/X, WhatsApp, Instagram, FB).  
- Supports **multilingual detection** for India’s diversity & beyond.  

### 🔮 Future Expansion  
- Detect **deepfakes, images, videos** 🎥  
- Partner with **governments, NGOs, and fact-checking bodies** 🏛️  
- **Gamified awareness** → Reward users for spotting/reporting misinformation 🎮  

---

## 👥 Team – Data Squad 💪  

- 👨‍💻 Aditya Kokate  
- 🧑‍💻 Yash Purbhe  
- 👩‍💻 Dipshree Vartak  
- 👨‍💻 Manas Gurav  
- 👨‍💻 Amaan Kherani  

---

💡 Our vision → **An informed digital society, resilient against fake news.**  

🔥 **RealityCheck AI – Truth, in Real Time.**  

---
