import fitz
import os

PDF_PATH = "Catalogo dia de la mujer 2026_20260306_094416_0000.pdf"
OUT_DIR = "public/images/catalog"
# Pages 7 onwards (0-indexed = page 6+)
START_PAGE = 6  # page 7 in PDF viewer
DPI = 180       # enough for web, keeps file size reasonable

os.makedirs(OUT_DIR, exist_ok=True)

doc = fitz.open(PDF_PATH)
total = len(doc)
print(f"Total pages: {total}")

for i in range(START_PAGE, total):
    page = doc[i]
    mat = fitz.Matrix(DPI / 72, DPI / 72)
    pix = page.get_pixmap(matrix=mat, alpha=False)
    out_path = os.path.join(OUT_DIR, f"page_{i+1:02d}.jpg")
    pix.pil_save(out_path, format="JPEG", quality=85, optimize=True)
    print(f"  Saved: {out_path}")

doc.close()
print("Done!")
