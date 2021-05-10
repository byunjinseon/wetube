import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const db = mongoose.connection;

const handleOpen = () => console.log("connected to DB");
const handleError = (error) => console.log(`error on db connection:${error}`); 

db.once("open", handleOpen);
db.on("error", handleError);



// export const videos = [
//     {
//         id: 324393,
//         title: '[로스트아크] 모코코걸스 - Rollin (암살자 춤 Ver.)',
//         description: '#Shorts​ #로스트아크​ #롤린​ #모코코',
//         views: 24,
//         videoFile: 'https://www.youtube.com/embed/Qq0paop_3eM',
//         creator: {
//             id: 121212,
//             name: "bjs",
//             email: "bjs@naver.com"
//         }
//     },
//     {
//         id: 372393,
//         title: '[로스트아크] 모코소년단 - Dynamite (빛나는 별의 춤 남자 Ver.)',
//         description: '#로스트아크​ #Dynamite​ #다이너마이트​ #모코코',
//         views: 14,
//         videoFile: 'https://www.youtube.com/embed/VKNdAItbHH8',
//         creator: {
//             id: 121212,
//             name: "bjs",
//             email: "bjs@naver.com"
//         }
//     },
//     {
//         id: 424393,
//         title: '[로스트아크] 모코무 - HIP (암살자 춤 Ver.)',
//         description: '#Shorts​ #로스트아크​ #HIP​ #마마무​ #모코코',
//         views: 34,
//         videoFile: 'https://www.youtube.com/embed/iiKJtxPFGJI',
//         creator: {
//             id: 121212,
//             name: "bjs",
//             email: "bjs@naver.com"
//         }
//     }
// ]


