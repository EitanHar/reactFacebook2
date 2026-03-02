import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// --- נתוני דוגמה (Initial DB) ---

let users = [
    { email: "itai@example.com", username: "itai_gold", password: "123", image: "https://i.pravatar.cc/150?u=itai" },
    { email: "maya@example.com", username: "maya_art", password: "123", image: "https://i.pravatar.cc/150?u=maya" },
    { email: "dan@example.com", username: "dan_tech", password: "123", image: "https://i.pravatar.cc/150?u=dan" },
    { email: "noa@example.com", username: "noa_travel", password: "123", image: "https://i.pravatar.cc/150?u=noa" },
    { email: "guy@example.com", username: "guy_music", password: "123", image: "https://i.pravatar.cc/150?u=guy" }
];

let posts = [
    {
        postId: "101",
        user: users[0],
        content: "איזה יום יפה לטיול בחרמון! ❄️",
        date: "2024-03-20T10:00:00Z",
        comments: [
            { posterId: "maya_art", text: "תמונה מדהימה!" },
            { posterId: "dan_tech", text: "תהנה!" }
        ],
        likes: 15
    },
    {
        postId: "102",
        user: users[1],
        content: "סיימתי לצייר את הציור החדש שלי, מה אומרים?",
        date: "2024-03-21T14:30:00Z",
        comments: [
            { posterId: "itai_gold", text: "וואו, הכישרון שלך מטורף!" }
        ],
        likes: 42
    },
    {
        postId: "103",
        user: users[2],
        content: "מישהו שמע על הטכנולוגיה החדשה של גוגל?",
        date: "2024-03-22T08:15:00Z",
        comments: [],
        likes: 5
    },
    {
        postId: "104",
        user: users[3],
        content: "המלצות למסעדות בפריז? 🇫🇷",
        date: "2024-03-23T19:00:00Z",
        comments: [
            { posterId: "guy_music", text: "יש בולנז'רי מעולה ברובע ה-4!" }
        ],
        likes: 28
    },
    {
        postId: "105",
        user: users[4],
        content: "הופעה חיה הערב בזאפה! מי בא?",
        date: "2024-03-24T21:45:00Z",
        comments: [],
        likes: 12
    }
];

app.use(express.json());

// --- נתיבי ה-API ---

// GET: /users/
app.get('/users', (req: Request, res: Response) => {
    res.json(users);
});

// GET: /posts/
app.get('/posts', (req: Request, res: Response) => {
    res.json(posts);
});

// POST: /posts/
app.post('/posts', (req: Request, res: Response) => {
    const newPost = req.body;
    posts.push(newPost);
    res.status(201).json(newPost);
});

// PATCH: /posts/:id/like
app.patch('/posts/:id/like', (req: Request, res: Response) => {
    const { id } = req.params;
    const post = posts.find(p => p.postId === id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    
    post.likes = (post.likes || 0) + 1;
    res.json(post);
});

// הרצת השרת
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Loaded ${users.length} users and ${posts.length} posts.`);
});