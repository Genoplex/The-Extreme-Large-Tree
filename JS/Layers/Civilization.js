addLayer("Civilization",
{
    name         : "Civilization",
    symbol       : "Ci",
    resource     : "Wisdom",
    baseResource : "Lifes",
    color        : "#B8B8B8",
    type         : "normal",
    exponent     : 0.5,
    position     : 0,
    row          : 5,
    requires     : new Decimal(10),
    branches     : ["Lifes"],

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
        return player.Lifes.points
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