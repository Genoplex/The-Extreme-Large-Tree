addLayer("War",
{
    name         : "War",
    symbol       : "W",
    resource     : "Weapons",
    baseResource : "Influence",
    color        : "#FFFFFF",
    type         : "normal",
    exponent     : 0.5,
    position     : 10,
    row          : 6,
    requires     : new Decimal(10),
    branches     : ["Politics"],

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