
const randomAnimalsNames = [
    "Aardvark",
    "Albatross",
    "Alligator",
    "Alpaca",
    "Ant",
    "Anteater",
    "Antelope",
    "Ape",
    "Armadillo",
    "Donkey",
    "Baboon",
    "Badger",
    "Barracuda",
    "Bat",
    "Bear",
    "Beaver",
    "Bee",
    "Bison",
    "Boar",
    "Buffalo",
    "Butterfly",
    "Camel",
    "Capybara",
    "Caribou",
    "Cassowary",
    "Cat",
    "Caterpillar",
    "Cattle",
    "Chamois",
    "Cheetah",
    "Chicken",
    "Chimpanzee",
    "Chinchilla",
    "Chough",
    "Clam",
    "Cobra",
    "Cockroach",
    "Cod",
    "Cormorant",
    "Coyote",
    "Crab",
    "Crane",
    "Crocodile",
    "Crow",
    "Curlew",
    "Deer",
    "Dinosaur",
    "Dog",
    "Dogfish",
    "Dolphin",
    "Dotterel",
    "Dove",
    "Dragonfly",
    "Duck",
    "Dugong",
    "Dunlin",
    "Eagle",
    "Echidna",
    "Eel",
    "Eland",
    "Elephant",
    "Elk",
    "Emu",
    "Falcon",
    "Ferret",
    "Finch",
    "Fish",
    "Flamingo",
    "Fly",
    "Fox",
    "Frog",
    "Gaur",
    "Gazelle",
    "Gerbil",
    "Giraffe",
    "Gnat",
    "Gnu",
    "Goat",
    "Goldfinch",
    "Goldfish",
    "Goose",
    "Gorilla",
    "Goshawk",
    "Grasshopper",
    "Grouse",
    "Guanaco",
    "Gull",
    "Hamster",
    "Hare",
    "Hawk",
    "Hedgehog",
    "Heron",
    "Herring",
    "Hippopotamus",
    "Hornet",
    "Horse",
    "Human",
    "Hummingbird",
    "Hyena",
    "Ibex",
    "Ibis",
    "Jackal",
    "Jaguar",
    "Jay",
    "Jellyfish",
    "Kangaroo",
    "Kingfisher",
    "Koala",
    "Kookabura",
    "Kouprey",
    "Kudu",
    "Lapwing",
    "Lark",
    "Lemur",
    "Leopard",
    "Lion",
    "Llama",
    "Lobster",
    "Locust",
    "Loris",
    "Louse",
    "Lyrebird",
    "Magpie",
    "Mallard",
    "Manatee",
    "Mandrill",
    "Mantis",
    "Marten",
    "Meerkat",
    "Mink",
    "Mole",
    "Mongoose",
    "Monkey",
    "Moose",
    "Mosquito",
    "Mouse",
    "Mule",
    "Narwhal",
    "Newt",
    "Nightingale",
    "Octopus",
    "Okapi",
    "Opossum",
    "Oryx",
    "Ostrich",
    "Otter",
    "Owl",
    "Oyster",
    "Panther",
    "Parrot",
    "Partridge",
    "Peafowl",
    "Pelican",
    "Penguin",
    "Pheasant",
    "Pig",
    "Pigeon",
    "Pony",
    "Porcupine",
    "Porpoise",
    "Quail",
    "Quelea",
    "Quetzal",
    "Rabbit",
    "Raccoon",
    "Rail",
    "Ram",
    "Rat",
    "Raven",
    "Red deer",
    "Red panda",
    "Reindeer",
    "Rhinoceros",
    "Rook",
    "Salamander",
    "Salmon",
    "Sand Dollar",
    "Sandpiper",
    "Sardine",
    "Scorpion",
    "Seahorse",
    "Seal",
    "Shark",
    "Sheep",
    "Shrew",
    "Skunk",
    "Snail",
    "Snake",
    "Sparrow",
    "Spider",
    "Spoonbill",
    "Squid",
    "Squirrel",
    "Starling",
    "Stingray",
    "Stinkbug",
    "Stork",
    "Swallow",
    "Swan",
    "Tapir",
    "Tarsier",
    "Termite",
    "Tiger",
    "Toad",
    "Trout",
    "Turkey",
    "Turtle",
    "Viper",
    "Vulture",
    "Wallaby",
    "Walrus",
    "Wasp",
    "Weasel",
    "Whale",
    "Wildcat",
    "Wolf",
    "Wolverine",
    "Wombat",
    "Woodcock",
    "Woodpecker",
    "Worm",
    "Wren",
    "Yak",
    "Zebra"
];
let flag =0;
// let green =0;
let GCheckStatus = 0;
let  buttonsParent = document.querySelector('.buttons-parent');
let randomAnimalName = null;
let hungmanchildren = document.querySelector(".hungman").children;
for(let i=0; i<hungmanchildren.length; i++){
    hungmanchildren[i].classList.add('display-none')
}

function giveMeButtonsOnScreen(){
    let buttonsDataArray = Array(26).fill(null);
    let i =65;
    buttonsDataArray = buttonsDataArray.map((value) => {
        return String.fromCharCode(i++);
    });
    buttonsDataArray.forEach(el =>{
        const btn = document.createElement('button');
        btn.textContent = el;
        buttonsParent.appendChild(btn);
    })
}
giveMeButtonsOnScreen();

function chooseRandomAnimalName(){
    const rn = Math.floor(Math.random() * randomAnimalsNames.length);
    randomAnimalName = randomAnimalsNames[rn].toUpperCase();
    const blank = document.querySelector('.blank');

    for(let i =0; i<randomAnimalName.length; i++){
        const element = randomAnimalName[i];
        // console.log(element);
        const para = document.createElement("p");
        const span = document.createElement("span");
        span.classList.add('spa');
        blank.appendChild(para);
        para.appendChild(span);
        span.textContent = element;
    }
}
// let status =0;
const buttonParentClickFunciton = function(e){
    // console.log(e.target.textContent);
    let nstatus = 0;
    if(e.target.textContent.length === 1){
        const letterClicked = e.target.textContent;
        console.log(randomAnimalName);
        console.log(letterClicked);
        
        const allLettersEls = document.getElementsByClassName('spa');
        // console.log(allLettersEls);
        for (let i =0; i<allLettersEls.length; i++){
            const spanEl = allLettersEls[i];

            if(letterClicked == spanEl.textContent){
                spanEl.parentElement.textContent= letterClicked;
                GCheckStatus++;
                nstatus++;
            }
        }

        if(nstatus != 0){
            e.target.classList.add('greenbtn');
            
        }
        else
        {
            e.target.classList.add('redbtn');
            hungmanchildren[flag].classList.remove('display-none')
            // console.log(flag,hungmanchildren.length-1);
            
            if(flag == hungmanchildren.length-1){
                // hungmanchildren[flag].classList.remove('display-none')
                alert('Game Over Restart the game')
                location.reload();
            }
            flag++;
            
        }
        // console.log(CheckStatus,randomAnimalName);
        if(GCheckStatus == randomAnimalName.length){
            alert("You Won The Match")
            location.reload();
        }

        // e.target.setAttribute('disabled','disabled');
    }
};
buttonsParent.addEventListener("click",buttonParentClickFunciton);
chooseRandomAnimalName();