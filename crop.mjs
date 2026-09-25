import { Jimp } from 'jimp';

async function main() {
    const imgPath = "C:/Users/Ibad Traders/.gemini/antigravity-ide/brain/a02a73d0-db9b-4928-b5a2-bdebe2d83896/.user_uploaded/media_1790280009663.png";
    const image = await Jimp.read(imgPath);
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    // Male is on the left
    const male = image.clone().crop({ x: 0, y: 0, w: Math.floor(width / 2), h: height });
    male.autocrop();
    await male.write("public/male_host.png");
    
    // Female is on the right
    const female = image.clone().crop({ x: Math.floor(width / 2), y: 0, w: Math.floor(width / 2), h: height });
    female.autocrop();
    await female.write("public/female_host.png");
    console.log("Images cropped successfully!");
}

main().catch(console.error);
