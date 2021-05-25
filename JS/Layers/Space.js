addLayer("Space",
{
    name         : "Space",
    symbol       : "Sp",
    resource     : "Explore",
    baseResource : "Technology",
    color        : "#888888",
    type         : "normal",
    exponent     : 0.5,
    position     : 1,
    row          : 7,
    requires     : new Decimal(10),
    branches     : ["War","Magic","Politics","Culture","Science"],

    resetDescription:"Merge Energy for ",

    layerShown()
    {
        return false
    },

    startData()
    {    
        return{
        unlocked: true,
		points: new Decimal(0),
        }
    },
        
    baseAmount()
    {
        return player.Civilization.points
    },
        
    gainMult()
    {
        mult = new Decimal(1)
        return mult
    },

    gainExp()
    {
        return new Decimal(1)
    },

    update(diff)
    {
    },
})