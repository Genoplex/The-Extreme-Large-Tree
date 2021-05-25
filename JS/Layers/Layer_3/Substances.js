addLayer("Substances",
{
    name         : "Substances",
    symbol       : "Su",
    resource     : "Matters",
    baseResource : "Atoms",
    color        : "#E8E8E8",
    type         : "normal",
    exponent     : 1,
    position     : 0,
    row          : 2,
    requires     : new Decimal(20000),
    branches     : ["Elements"],
    base         : 1000,

    resetDescription : "Accumulate Atoms for ",

    tooltip :  function()
    {
        return "Layer: Substances\n" + format(player.Substances.points)
    },

    hotkeys :
    [
        {
            key:"d",
            description : "Press → D ← for Substances Reset",
            onPress :  function()
            {
                if(player.Substances.unlocked)
                {
                    
                }
            }
        }
    ],


    doReset()
    {
        
    },

    canBuyMax    : function()
    {
        return true
    },

    layerShown()
    {
        return (hasMilestone("Elements",3) || player[this.layer].unlocked)
    },

    startData()
    {    
        return{
            unlocked  : false,
            points    : new Decimal(0),
            best      : new Decimal(0),
            Elements  : new Decimal(0)
        }
    },
    
    effect()
    {
        x = player.Substances.upgrades.length
        value = Math.pow(2,x)
        return value
    },
        
    baseAmount()
    {
        return player.Elements.points
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
        player.Substances.Elements = 0
        if(getBuyableAmount("Elements",11) > 0)
        player.Substances.Elements = player.Substances.Elements + getBuyableAmount("Elements",11)
    },

})