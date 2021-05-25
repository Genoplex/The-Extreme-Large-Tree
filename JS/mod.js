let modInfo = {
	name        : "The World Tree",
	id          : "TWT",
	author      : "Genoplex",
	pointsName  : "Energy",
	discordName : "",
	discordLink : "",
	changelogLink: "https://github.com/Genoplex/The-Extreme-Large-Tree/blob/master/changelog.md",
	initialStartPoints: new Decimal (15),
	
	offlineLimit: 0,
}

// Set your version in num and name
let VERSION = {
	num: "0.1 Element Emergence (BUG Test)",
	name: "",
}

let changelog = 'Collapse, Think, Rebuild'

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("Particles",11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(5)
	if(hasUpgrade("Particles",12))
	{
		gain = gain.times(upgradeEffect("Particles",12))
	}
	if(hasUpgrade("Particles",13))
	{
		gain = gain.times(upgradeEffect("Particles",13))
	}
	if(hasUpgrade("Particles",21))
	{
		gain = gain.times(upgradeEffect("Particles",21))
	}
	if(hasUpgrade("Particles",31))
	{
		gain = gain.times(upgradeEffect("Particles",31))
	}
	if(hasUpgrade("Particles",32))
	{
		gain = gain.times(upgradeEffect("Particles",32))
	}

	if(player.Elements.unlocked)
	{
		gain = gain.times(tmp["Elements"].effect.main_multiple)
	}
	if(hasUpgrade("Elements",11))
	{
		gain = gain.times(upgradeEffect("Elements",11))
	}
	if(hasUpgrade("Elements",12))
	{
		gain = gain.times(upgradeEffect("Elements",12))
	}
	if(hasUpgrade("Elements",13))
	{
		gain = gain.times(upgradeEffect("Elements",13))
	}

	if(hasUpgrade("Elemixs",11))
	{
		gain = gain.times(player.Elemixs.UpgradeAmount)
	}
	if(hasUpgrade("Elemixs",21))
	{
		gain = gain.times(2.5)
	}
	if(hasUpgrade("Elemixs",41))
	{
		gain = gain.times(player.Elemixs.Weather)
	}
	if(getBuyableAmount("Elemixs",11) >= 1)
	{
		gain = gain.times(player.Elemixs.ActivePowerEffect)
	}
	if(hasMilestone("Elemixs",1))
	{
		gain = gain.pow(player.Elemixs.OrderEffect)
	}

	if(((getClickableState("Elemixs",25) == "Producting") || (getClickableState("Elemixs",26) == "Producting") || (getClickableState("Elemixs",27) == "Producting")) && (!hasUpgrade("Elemixs",12)))
	{
		gain = new Decimal(0)
	}

	if(((getClickableState("ExoticElements",12) == "Producting") || (getClickableState("ExoticElements",13) == "Producting")) && (!hasUpgrade("ExoticElements",31)))
	{
		gain = new Decimal(0)
	}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = ["","Current Goal: Reach the EiM6, EeM4, EEM3(though they are WIP)"]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}