-- Allow every video source type supported by the frontend admin panel.
-- Without this constraint update, Supabase rejects non-youtube/link/file rows,
-- so a newly added video appears locally for a moment and then disappears after realtime reload.

alter table public.el_videos
  drop constraint if exists el_videos_type_check;

alter table public.el_videos
  add constraint el_videos_type_check
  check (
    type = any (
      array[
        'youtube'::text,
        'vimeo'::text,
        'google-drive'::text,
        'dropbox'::text,
        'onedrive'::text,
        'tiktok'::text,
        'instagram'::text,
        'facebook'::text,
        'dailymotion'::text,
        'twitch'::text,
        'direct'::text,
        'motion'::text,
        'link'::text,
        'file'::text
      ]
    )
  );
