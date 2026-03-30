"""
Generate OG image for dieleconsulting.com
1200x630px, dark background, Joe's headshot, tagline, name
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os
import textwrap

# Paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_DIR = os.path.dirname(SCRIPT_DIR)
HEADSHOT_PATH = os.path.join(REPO_DIR, "public", "images", "joe-headshot.jpg")
OUTPUT_PATH = os.path.join(REPO_DIR, "public", "og-image.jpg")

# Canvas
W, H = 1200, 630
img = Image.new("RGB", (W, H), color="#111111")
draw = ImageDraw.Draw(img)

# ── Background gradient effect (subtle left-to-right dark to slightly lighter) ──
for x in range(W):
    alpha = int(x / W * 30)
    for y in range(H):
        r, g, b = img.getpixel((x, y))
        img.putpixel((x, y), (min(r + alpha // 4, 40), min(g + alpha // 4, 40), min(b + alpha // 4, 40)))

# ── Red accent bar (left edge) ──
draw.rectangle([0, 0, 6, H], fill="#B22222")

# ── Load and place headshot (right side, portrait crop) ──
headshot = Image.open(HEADSHOT_PATH).convert("RGB")
# Crop to portrait: take center portion
hs_w, hs_h = headshot.size
target_aspect = 3 / 4
crop_w = min(hs_w, int(hs_h * target_aspect))
crop_h = min(hs_h, int(hs_w / target_aspect))
left = (hs_w - crop_w) // 2
top = 0  # top-aligned (face is at top)
headshot = headshot.crop((left, top, left + crop_w, top + crop_h))

# Resize to fit right panel (420px wide, full height)
hs_target_h = H
hs_target_w = int(hs_target_h * target_aspect)
headshot = headshot.resize((hs_target_w, hs_target_h), Image.LANCZOS)

# Create gradient mask for left edge of headshot (fade to transparent)
mask = Image.new("L", (hs_target_w, hs_target_h), 255)
mask_draw = ImageDraw.Draw(mask)
fade_width = 120
for x in range(fade_width):
    alpha = int((x / fade_width) * 255)
    mask_draw.line([(x, 0), (x, hs_target_h)], fill=alpha)

# Place headshot on right side
hs_x = W - hs_target_w
img.paste(headshot, (hs_x, 0), mask)

# ── Dark overlay on right to ensure text contrast on left ──
overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
overlay_draw = ImageDraw.Draw(overlay)
# Left 2/3 gets a subtle dark overlay
overlay_draw.rectangle([0, 0, 750, H], fill=(17, 17, 17, 200))
img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
draw = ImageDraw.Draw(img)

# Re-draw red accent bar (after composite)
draw.rectangle([0, 0, 6, H], fill="#B22222")

# ── Fonts ──
try:
    font_name = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 52)
    font_title = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 38)
    font_tagline = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 26)
    font_label = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 18)
    font_url = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 18)
except:
    font_name = ImageFont.load_default()
    font_title = font_name
    font_tagline = font_name
    font_label = font_name
    font_url = font_name

# ── Text content ──
LEFT_PAD = 60
text_area_width = 680  # left panel width for text

# "DIELE CONSULTING" label (small caps style)
label_y = 60
draw.text((LEFT_PAD, label_y), "DIELE CONSULTING", fill="#B22222", font=font_label)

# Red divider line
draw.rectangle([LEFT_PAD, label_y + 32, LEFT_PAD + 180, label_y + 34], fill="#B22222")

# Joe's name
name_y = label_y + 55
draw.text((LEFT_PAD, name_y), "Joseph Diele", fill="#E8E8E8", font=font_name)

# Title
title_y = name_y + 70
draw.text((LEFT_PAD, title_y), "Executive Coach · Author · Engineer-turned-Leader", fill="#909090", font=font_url)

# Tagline (wrapped)
tagline = "\u201cThe skills that made you the best engineer\nin the room won\u2019t make you the best leader.\nI help you close that gap.\u201d"
tagline_y = title_y + 80
line_height = 42
for i, line in enumerate(tagline.split("\n")):
    draw.text((LEFT_PAD, tagline_y + i * line_height), line, fill="#C8C8C8", font=font_tagline)

# URL at bottom
url_y = H - 55
draw.text((LEFT_PAD, url_y), "dieleconsulting.com", fill="#606060", font=font_url)

# ── Save ──
img.save(OUTPUT_PATH, "JPEG", quality=92)
print(f"OG image saved: {OUTPUT_PATH}")
print(f"Size: {img.size}")
