import { Router } from "express";

const router = Router();

// In-memory lock state — resets on server restart
let siteLocked = false;

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "AdminEL_2026";

router.get("/admin/lock-status", (_req, res) => {
  res.json({ locked: siteLocked });
});

router.post("/admin/lock", (req, res) => {
  const { password } = req.body as { password?: string };
  if (password !== ADMIN_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  siteLocked = true;
  res.json({ locked: true });
});

router.post("/admin/unlock", (req, res) => {
  const { password } = req.body as { password?: string };
  if (password !== ADMIN_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  siteLocked = false;
  res.json({ locked: false });
});

export default router;
