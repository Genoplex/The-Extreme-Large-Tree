addLayer("Politics",
{
    name         : "Politics",
    symbol       : "Po",
    resource     : "Influence",
    baseResource : "Wisdom",
    color        : "#FFFFFF",
    type         : "normal",
    exponent     : 0.5,
    position     : 3,
    row          : 6,
    requires     : new Decimal(10),
    branches     : ["Civilization"],

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