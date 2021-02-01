addLayer("Matters",
{
    name         : "Matters",
    symbol       : "M",
    resource     : "Matters",
    baseResource : "Atoms",
    color        : "#F8FFB8",
    type         : "normal",
    exponent     : 1,
    position     : 0,
    row          : 1,
    requires     : new Decimal(1000),
    branches     : ["Elements"],
    base         : Infinity,

    resetDescription : "Merge Atoms for ",

    tabFormat:
    [
        "main-display",
        "prestige-button",
        "blank",
        ["display-text",function(){return 'You have ' + format(player.Elements.points) + ' Atoms'}],
        "blank",
        ["display-text",function(){return 'Under Construction'}],
        "buyables",
        "blank",
        "upgrades",
        "blank",
        "milestones",
        "blank",
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
        return (hasMilestone("Elements",3) || player[this.layer].unlocked)
    },

    startData()
    {    
        return{
            unlocked  : false,
            points    : new Decimal(0),
            best      : new Decimal(0)
        }
    },
    
    effect()
    {
        return 1
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
        player.resetTime += 0.05
    },
})