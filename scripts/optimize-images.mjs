import sharp from "sharp";
import { readdir, stat, mkdir } from "fs/promises";
import { join } from "path";

const INPUT_DIR = "/vercel/share/v0-project/public/images";
const OUTPUT_DIR = "/vercel/share/v0-project/public/images";

// Quality settings per image type
const QUALITY_MAP = {
  "hero.jpg": { webp: 78, jpeg: 80, resize: { width: 1920 } },
  "salon.jpg": { webp: 78, jpeg: 80, resize: { width: 1200 } },
  "services.jpg": { webp: 78, jpeg: 80, resize: { width: 1200 } },
  "team.jpg": { webp: 78, jpeg: 80, resize: { width: 800 } },
  "gallery-1.jpg": { webp: 78, jpeg: 80, resize: { width: 800 } },
  "gallery-2.jpg": { webp: 78, jpeg: 80, resize: { width: 800 } },
  "gallery-3.jpg": { webp: 78, jpeg: 80, resize: { width: 800 } },
};

async function getFileSize(path) {
  const s = await stat(path);
  return s.size;
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

async function optimizeImage(filename) {
  const inputPath = join(INPUT_DIR, filename);
  const config = QUALITY_MAP[filename];
  if (!config) return;

  const originalSize = await getFileSize(inputPath);
  console.log(`\n--- ${filename} ---`);
  console.log(`  Original: ${formatSize(originalSize)}`);

  // Read the image
  let pipeline = sharp(inputPath);
  const metadata = await pipeline.metadata();
  console.log(`  Dimensions: ${metadata.width}x${metadata.height}`);

  // Resize if wider than target
  if (metadata.width > config.resize.width) {
    pipeline = sharp(inputPath).resize({
      width: config.resize.width,
      withoutEnlargement: true,
    });
    console.log(`  Resizing to max width: ${config.resize.width}px`);
  }

  // Compress JPEG (overwrite original)
  const jpegBuffer = await pipeline
    .clone()
    .jpeg({ quality: config.jpeg, mozjpeg: true, progressive: true })
    .toBuffer();

  const jpegPath = join(OUTPUT_DIR, filename);
  await sharp(jpegBuffer).toFile(jpegPath);
  const jpegSize = await getFileSize(jpegPath);
  console.log(`  Compressed JPEG: ${formatSize(jpegSize)} (${((1 - jpegSize / originalSize) * 100).toFixed(1)}% reduction)`);

  // Generate WebP
  const webpFilename = filename.replace(/\.jpg$/, ".webp");
  const webpPath = join(OUTPUT_DIR, webpFilename);
  const webpBuffer = await pipeline
    .clone()
    .webp({ quality: config.webp, effort: 6 })
    .toBuffer();
  await sharp(webpBuffer).toFile(webpPath);
  const webpSize = await getFileSize(webpPath);
  console.log(`  WebP: ${formatSize(webpSize)} (${((1 - webpSize / originalSize) * 100).toFixed(1)}% reduction vs original)`);

  // Generate a tiny blur placeholder for hero
  if (filename === "hero.jpg") {
    const blurBuffer = await sharp(inputPath)
      .resize(10, 10, { fit: "cover" })
      .jpeg({ quality: 20 })
      .toBuffer();
    const blurBase64 = blurBuffer.toString("base64");
    console.log(`  Blur placeholder base64 length: ${blurBase64.length} chars`);
    console.log(`  data:image/jpeg;base64,${blurBase64}`);
  }
}

async function main() {
  console.log("=== Image Optimization Report ===");
  console.log(`Input directory: ${INPUT_DIR}\n`);

  const files = await readdir(INPUT_DIR);
  const jpgFiles = files.filter((f) => f.endsWith(".jpg"));
  console.log(`Found ${jpgFiles.length} JPG files to optimize.`);

  for (const file of jpgFiles) {
    await optimizeImage(file);
  }

  console.log("\n=== Optimization Complete ===");

  // Summary
  const allFiles = await readdir(OUTPUT_DIR);
  const webpFiles = allFiles.filter((f) => f.endsWith(".webp"));
  console.log(`Generated ${webpFiles.length} WebP files.`);
  
  // Total size comparison
  let totalOrigJpg = 0;
  let totalWebp = 0;
  for (const f of jpgFiles) {
    if (QUALITY_MAP[f]) {
      totalOrigJpg += await getFileSize(join(OUTPUT_DIR, f));
      const webpName = f.replace(".jpg", ".webp");
      if (allFiles.includes(webpName)) {
        totalWebp += await getFileSize(join(OUTPUT_DIR, webpName));
      }
    }
  }
  console.log(`\nTotal compressed JPG: ${formatSize(totalOrigJpg)}`);
  console.log(`Total WebP: ${formatSize(totalWebp)}`);
  console.log(`WebP savings vs compressed JPG: ${((1 - totalWebp / totalOrigJpg) * 100).toFixed(1)}%`);
}

main().catch(console.error);
