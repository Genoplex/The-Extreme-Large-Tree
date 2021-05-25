addLayer("Nature",
{
    name         : "Nature",
    symbol       : "N",
    resource     : "Naturenergy",
    baseResource : "Matters",
    color        : "#D0D0D0",
    type         : "normal",
    exponent     : 1,
    position     : 2,
    row          : 3,
    requires     : new Decimal(10),
    branches     : ["Substances","ExoticSubstances","MagicSubstances"],
    base         : 1000,

    resetDescription : "Merge Matter for ",

    tooltip :  function()
    {
        return "Layer: Nature\n" + format(player.Nature.points)
    },
    
    tabFormat:
    [
        'main-display',
        "blank",
        ['display-text',function(){return 'You are gaining ' + format(player.Nature.Gain) + ' Naturenergy per second' + format(hasMilestone("Substances",4))}],
    ],

    doReset()
    {
        player.resetTime = 0
    },

    canBuyMax    : function()
    {
        return true
    },

    layerShown()
    {
        return (hasMilestone("Substances",4) || player.Nature.unlocked)
    },

    startData()
    {    
        return{
            unlocked  : false,
            points    : new Decimal(0),
            best      : new Decimal(0),
            Gain      : new Decimal(0)
        }
    },
    
    effect()
    {
        return 1
    },
        
    baseAmount()
    {
        return player.Substances.points
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
        player.resetTime += 0.05
        
        if (player.Nature.unlocked)
        {
            player.Nature.Gain = 1
            player.Nature.points = player.Nature.points.add(player.Nature.Gain*0.05)
        }
    },
})