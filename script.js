let temp1=0,temp=0,correctLetter=0,wrongLetter =0;
let Gameover=false;
let gameMode=0,hintNum=0;
let hintChar='A';
let isSound=true;isMusic=true,isMusicPlaying=true;

keys = document.getElementsByClassName('key');

const bgMusic = new Audio('Sounds/wordgame.mp3');
bgMusic.volume=0.2;
bgMusic.loop=true;

const correctSound = new Audio('Sounds/correct.mp3');
const wrongSound = new Audio('Sounds/wrong.mp3');
wrongSound.volume=0.6;
const deadSound = new Audio('Sounds/dead.mp3');
const survivedSound = new Audio('Sounds/survived.mp3');
if(isMusic) bgMusic.play();

//Array Of Words
let countyArray=["Afghanistan","Albania","Algeria","Argentina","Armenia","Australia","Austria","Bahamas","Bahrain","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Brazil","Burundi","Cambodia","Cameroon","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Denmark","Egypt","Estonia","Ethiopia","Fiji","Finland","France","Gambia","Georgia","Germany","Ghana","Greenland","Guatemala","Haiti","Hungary","Iceland","India","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Macau","Malawi","Malaysia","Maldives","Mali","Malta","Mexico","Moldova","Monaco","Mongolia","Morocco","Namibia","Nepal","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Paraguay","Peru","Poland","Portugal","Qatar","Reunion","Romania","Russia","Rwanda","Senegal","Serbia","Singapore","Slovakia","Spain","SriLanka","Sudan","Swaziland","Sweden","Syria","Taiwan","Thailand","Togo","Tonga","Tunisia","Turkey","Uganda","Ukraine","UAE","UK","USA","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];
let cityArray=["Kathmandu","NewYork","London","Tokyo","chicago","paris","berlin","Mumbai","Bangkok","Beijing","Dubai","Shangai","HongKong","Singapore","Rome","Delhi","Moscow","Porto","Bercelona","Madrid","Sydney","Lisbon","istanabul","Seoul","vanice"]
let foodArray=["Popcorn","Chips","Rice","ketchup","Butter","pizza","burgur","noodels","momo","meat","candy","donut","lobster","hamburger","sushi","chocolate","curry","sandwich","pastry","cake"];
let superheroArray=["Antman","Aquaman","Batman","Daredevil","Hawkeye","Ironman","RObin","Thor","Wasp","Xman","Wolverine","Superman","Spiderman","deadpool","flash","shazam"]
let npCityArraay=["kathmandu","pokhara","butwal","gaindakot","bharatpur","Birgunj","itahari","Dharan","Janakpur","baglung","beni","mustang","hetauda","Tikapur","Panauti","Muglin","damauli","Ghorai","Kailali","Tansen","Gorkha","Byas","waling","Dhangadhi"];
let brandArray = ["Nike","Google","Xerox","Amazon","Apple","Samsung","Starbucks","Adidas","CocaCola","pepsi","Intel","Canon","Lego","Nintendo","Skype","Adobe","Nokia","Sony","Vodafone","Ebay","IBM","Nikon","Durex","Fanta","Hp","Toyota","Microsoft"];
let gameArray = ["chess","Badminton","Football","Vollyball","Cricket","Basketball","Tennis","Soccer","Hockey","Golf","rugby","Archery","pingpong","baseball","wrestling","taekondo","Judo","polo","race","watrpolo"];
let appsArray = ["tiktok","instagram","facebook","Google","Chrome","Youtube","capcut","Zoom","Snapchat","whatsapp","telegram","Netflix","minecraft","roblox","tinder","candycrush","twitch","PUBGmobile","hbomax","googlepay","monopoly","desmos","discord","spotify"]


let wordArray=countyArray;

//Main Word Selector
let mainWord=wordArray[Math.floor(Math.random()*(wordArray.length))];
mainWord=mainWord.toUpperCase();
let mainArray = mainWord.split('');

//Letter Set
let letters=document.getElementsByClassName('letter');

for(i=mainArray.length;i<9;i++){
    letters[i].style.opacity ='0'
}



//Win Cheak
const checkWin = () =>{
    for(i=0;i<mainArray.length;i++){
        if(letters[i].innerText!=='.'){
            correctLetter++;
        } 
    }
    if(correctLetter>=mainArray.length){
        if(!Gameover) document.getElementsByClassName('gameInfo')[0].innerText='You Survived';
        correctSound.pause();
        if(!Gameover || isSound) survivedSound.play();
        document.getElementById('quitKey').innerText='Next';
        Gameover=true;
    }
    correctLetter=0;
}

//Wrong Ans
const wrongAns = () =>{
    wrongLetter++;
    if(wrongLetter===1) document.getElementById('image').src="Images/1.png"
    else if(wrongLetter===2) document.getElementById('image').src="Images/2.png"
    else if(wrongLetter===3) document.getElementById('image').src="Images/3.png"
    else if(wrongLetter===4) document.getElementById('image').src="Images/4.png"
    else if(wrongLetter===5) document.getElementById('image').src="Images/5.png"
    else if(wrongLetter===6) document.getElementById('image').src="Images/6.png"
    else if(wrongLetter===7) document.getElementById('image').src="Images/7.png"
    else if(wrongLetter>=8){
        document.getElementById('image').src="Images/8.png"
        Gameover=true;
        document.getElementsByClassName('gameInfo')[0].innerText='You Died';
        document.getElementById('quitKey').innerText='Next';
        for(i=0;i<mainArray.length;i++){
            letters[i].innerText = mainArray[i];
        }
        checkWin();
        if(isSound){
            survivedSound.pause();
            wrongSound.pause();
            deadSound.play();
        }
    } 
}

//key Clicked
const keyClicked = (text,num) => {
    if(!Gameover){
    for(i=0;i<mainArray.length;i++){
        if(text===mainArray[i]){
            letters[i].innerText = text;
            keys[num].style.backgroundColor = 'green';
            if(isSound) correctSound.play();
            temp1++;
        }
    }
    if(temp1===0){
        keys[num].style.backgroundColor = 'red'
        if(isSound) wrongSound.play();
        wrongAns();
    }
    else checkWin();
    temp1=0;
    keys[num].style.color='white';
    }
}

//Reset
const allReset = () =>{

    if(gameMode===0){
        gameMode = Math.floor(Math.random()*8)+1;
        document.getElementsByClassName('gameInfo')[0].innerText='Guess The Word';
    }
    if(gameMode===1){
        wordArray=countyArray;
        document.getElementsByClassName('gameInfo')[0].innerText='Guess The Country';
    } 
    else if(gameMode===2){
        wordArray= cityArray;
        document.getElementsByClassName('gameInfo')[0].innerText='Guess The City';
    } 
    else if(gameMode===3){
        wordArray= foodArray;
        document.getElementsByClassName('gameInfo')[0].innerText='Guess The Food Item';
    } 
    else if(gameMode===4){
        wordArray= superheroArray;
        document.getElementsByClassName('gameInfo')[0].innerText='Guess The Superhero';
    } 
    else if(gameMode===5){
        wordArray= npCityArraay;
        document.getElementsByClassName('gameInfo')[0].innerText='Guess The City(Nepal)';
    } 
    else if(gameMode===6){
        wordArray= brandArray;
        document.getElementsByClassName('gameInfo')[0].innerText='Guess The Brand Name';
    } 
    else if(gameMode===7){
        wordArray= gameArray;
        document.getElementsByClassName('gameInfo')[0].innerText='Guess The Game';
    } 
    else if(gameMode===8){
        wordArray= appsArray;
        document.getElementsByClassName('gameInfo')[0].innerText='Guess The App Name';
    } 

    mainWord=wordArray[Math.floor(Math.random()*(wordArray.length))];
    mainWord=mainWord.toUpperCase();
    mainArray = mainWord.split('');
    letters=document.getElementsByClassName('letter');
    for(i=0;i<mainArray.length;i++){
        document.getElementsByClassName('letter')[i].innerText='.'
        document.getElementsByClassName('letter')[i].style.opacity ='1'
    }
    for(i=mainArray.length;i<9;i++){
        letters[i].style.opacity ='0'
    }  
    document.getElementById('quitKey').innerText='Quit';
    document.getElementById('image').src="Images/0.png"
    Gameover=false; 
    for(i=0;i<26;i++){
        keys[i].style.backgroundColor='skyblue';
        keys[i].style.color='black';
    }
    correctLetter=0;
    wrongLetter=0;
}

if(mainWord.length>10) allReset();

//Keyboard

keys[0].addEventListener ('click', ()=>{
    keyClicked('A',0);
})
keys[1].addEventListener ('click', ()=>{
    keyClicked('B',1);
})
keys[2].addEventListener ('click', ()=>{
    keyClicked('C',2);
})
keys[3].addEventListener ('click', ()=>{
    keyClicked('D',3);
})
keys[4].addEventListener ('click', ()=>{
    keyClicked('E',4);
})
keys[5].addEventListener ('click', ()=>{
    keyClicked('F',5);
})
keys[6].addEventListener ('click', ()=>{
    keyClicked('G',6);
})
keys[7].addEventListener ('click', ()=>{
    keyClicked('H',7);
})
keys[8].addEventListener ('click', ()=>{
    keyClicked('I',8);
})
keys[9].addEventListener ('click', ()=>{
    keyClicked('J',9);
})
keys[10].addEventListener ('click', ()=>{
    keyClicked('K',10);
})
keys[11].addEventListener ('click', ()=>{
    keyClicked('L',11);
})
keys[12].addEventListener ('click', ()=>{
    keyClicked('M',12);
})
keys[13].addEventListener ('click', ()=>{
    keyClicked('N',13);
})
keys[14].addEventListener ('click', ()=>{
    keyClicked('O',14);
})
keys[15].addEventListener ('click', ()=>{
    keyClicked('P',15);
})
keys[16].addEventListener ('click', ()=>{
    keyClicked('Q',16);
})
keys[17].addEventListener ('click', ()=>{
    keyClicked('R',17);
})
keys[18].addEventListener ('click', ()=>{
    keyClicked('S',18);
})
keys[19].addEventListener ('click', ()=>{
    keyClicked('T',19);
})
keys[20].addEventListener ('click', ()=>{
    keyClicked('U',20);
})
keys[21].addEventListener ('click', ()=>{
    keyClicked('V',21);
})
keys[22].addEventListener ('click', ()=>{
    keyClicked('W',22);
})
keys[23].addEventListener ('click', ()=>{
    keyClicked('X',23);
})
keys[24].addEventListener ('click', ()=>{
    keyClicked('Y',24);
})
keys[25].addEventListener ('click', ()=>{
    keyClicked('Z',25);
})

document.getElementById('quitKey').addEventListener ('click', ()=>{
    if(Gameover){
        allReset();
    }
    else{
        wrongLetter=10;
        wrongAns();
    }
})

let charNum;

document.getElementById('hintKey').addEventListener ('click', ()=>{
    while(true){
        temp = Math.floor(Math.random()*mainArray.length);
        hintChar = mainArray[temp];
        if(letters[temp].innerText==='.'){
            charNum = hintChar.charCodeAt(0) - 65;
            keyClicked(hintChar,charNum);
            hintNum++;
            wrongLetter=wrongLetter+hintNum;
            wrongAns();
            break;
        }
    }
})


let modeChoice = document.getElementsByClassName("gamemodes");
let soundChoice = document.getElementsByClassName("soundmodes");
let musicChoice = document.getElementsByClassName("musicmodes");

modeChoice[0].addEventListener('click',()=>{
    gameMode=0;
    allReset();
})
modeChoice[1].addEventListener('click',()=>{
    gameMode=1;
    allReset();
})
modeChoice[2].addEventListener('click',()=>{
    gameMode=2;
    allReset();
})
modeChoice[3].addEventListener('click',()=>{
    gameMode=3;
    allReset();
})
modeChoice[4].addEventListener('click',()=>{
    gameMode=4;
    allReset();
})
modeChoice[5].addEventListener('click',()=>{
    gameMode=5;
    allReset();
})
modeChoice[6].addEventListener('click',()=>{
    gameMode=6;
    allReset();
})
modeChoice[7].addEventListener('click',()=>{
    gameMode=7;
    allReset();
})
modeChoice[8].addEventListener('click',()=>{
    gameMode=8;
    allReset();
})

soundChoice[0].addEventListener('click',()=>{
    isSound=true;
})
soundChoice[1].addEventListener('click',()=>{
    isSound=false;
})
musicChoice[0].addEventListener('click',()=>{
    isMusic=true;
    if(!isMusicPlaying){
        bgMusic.play();
        isMusicPlaying=true;
    }

})
musicChoice[1].addEventListener('click',()=>{
    isMusic=false;
    bgMusic.pause();
    isMusicPlaying=false;
})





