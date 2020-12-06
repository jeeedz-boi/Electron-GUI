# Electron-GUI
 
## Project Layout
![project_layout](/readme_img/project_layout.PNG)

```
รูปทั้งหมดต้องเขียนเข้า electron/Current, electron/Normal, electron/Fever
```
## ARM64 nodejs
```
wget https://nodejs.org/dist/v{version}/node-v{version}-linux-arm64.tar.xz
tar -xJf node-v{version}-linux-arm64.tar.xz
cd node-v{version}-linux-arm64
sudo cp -R * /usr/local/
node -v
npm -v

{version} = version of  nodejs 12.13.0 for example
REF = https://forums.developer.nvidia.com/t/how-to-install-node-js/84030/3
```

## Electron Dependencies
``` json
"dependencies": {
        "body-parser": "^1.19.0",
        "express": "^4.17.1",
        "file-system": "^2.2.2",
        "fs": "0.0.1-security",
        "glob": "^7.1.6",
        "request": "^2.88.2",
        "util": "^0.12.3"
}
```
## Deploy & Install Dependency
```
git clone https://github.com/naiguncha/Electron-GUI.git
cd Electron-GUI/electron
npm i body-parser express file-system fs glob request util python-shell --save
npm start
```

### After install all node dependency

#### ควรจะเป็นดังภาพด้านล่าง
![npm_start](/readme_img/npm_start.PNG)

```
และจะได้หน้า application ดังภาพ
***หมายเหตุภาพใน electron/Current รบกวบตั้งชื่อต่างกันมากกว่า 1 ภาพแล้ว overwrite สลับกัน เคยลอง overwrite ไปเรื่อยๆแล้ว แต่ตัว electron มันไม่อ่านครับ***
```
![application](/readme_img/application.PNG)
