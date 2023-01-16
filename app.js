let kittens = []
let empty = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault();
  let form = event.target
  number = generateId();
  // console.log(number)

  let catName = form.catName.value

  currentCat = kittens.find(kitten => kitten.name.toLowerCase() == catName.toLowerCase())

  if(!currentCat){
    currentCat = {name: catName, mood: 'angry', affection: 3, id: number}
    kittens.push(currentCat)
    saveKittens()
  }else{
    alert(`Cat name ${catName} already exists. Pick a different name.`)
  }
  // console.log(currentCat)

  form.reset()
  drawKittens()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem('kittens', JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
    if(kittensData){
        kittens = kittensData
    }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittensElem = document.getElementById('kittens');
  let kitMem = '';
  let count = 0;
  // console.log(kittens[count].name)
  

  kittens.forEach(kitten => {
    let pic = ''
    let catCard = '';
    if (kitten.mood == 'angry'){
      pic =  "😾"
    } if (kitten.mood == 'scared'){
      pic = "🙀"
    } if (kitten.mood == 'happy'){
      pic = "😸"
    }

    catCard += `<div class="card font">${pic} <br> ${kitten.name}, ${kitten.mood} <br>
    <button onclick='pet(kittens[${count}])'>pet</button> <button onclick='catnip(kittens[${count}])'>CatNip</button> <br>
    <button onclick='deleteCat(${count})'>Delete</button> </div>`
    kitMem += catCard
    count+=1
  });
  kittensElem.innerHTML = kitMem
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function moodChange(count) {

  if(count.affection >= 3.5) {
    count.mood = "happy"
  } if ((count.affection >= 2) && (count.affection < 3.5)){
    count.mood = "angry"
  } if (count.affection < 2){
    count.mood = "scared"
  }
  // console.log(count.mood, count.affection)
  
  drawKittens()
  saveKittens()
  
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(count) {
  let num = Math.random() * 1
  
  if ((num > 0.5) && (count.affection < 5)) {
    count.affection += 0.5
  } if ((num <= 0.5) && (count.affection > 0)) {
    count.affection -= 0.5
  }

  moodChange(count);
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(count) {
  count.affection = 5

  moodChange(count)
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  localStorage.removeItem('kittens')
  kittens = []
  drawKittens()
}

function deleteCat(count){
  kittens.splice(count, 1)
  empty = kittens
  clearKittens()
  kittens = empty
  empty = []
  saveKittens()
  drawKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away');
  drawKittens();
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();

// console.log(kittens[0].id)