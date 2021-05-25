addLayer("Multiverse",
{
    name         : "Multiverse",
    symbol       : "Mu",
    resource     : "Universe",
    baseResource : "Technology",
    color        : "#707070",
    type         : "normal",
    exponent     : 0.5,
    position     : 1,
    row          : 8,
    requires     : new Decimal(10),
    branches     : ["Space"],

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