addLayer("Achievements",
{
    name     : "Achievements",
    symbol   : "A",
    color    : "#cccccc",
    type     : "none",
    row      : "side",

    tooltip :  function()
    {
        return "Achievements"
    },

    tabFormat:
    [
        "blank",
        ["display-text",function(){return "Achievements won't give you any boosts. But they are very hard to achieve."}]
    ],

    layerShown :  function()
    {
        return true
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
        return player.Particles.points
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

