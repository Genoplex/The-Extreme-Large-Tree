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
        ["display-text",function(){return 'Tip: Matters and Elements are in the same row, and Matters is a branch of Elements. So Matters only reset Atoms.\nEach Matters upgrade boosts production by 2x. If there is no upgrades, go back to Elements.'}],
        "blank",
        "buyables",
        ["display-text",function(){return 'Under construction(There is really no upgrades and no boosts there now (\'U\'))'}],
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

    upgrades:
    {
        rows:12,
        cols:12,
        11:
        {
            title: function()
            {
                Text = "Water"
                return ("M1-1 " + Text)
            },
            unlocked :  function()
            {
                return false
            }
        },
        12:
        {
            title: function()
            {
                Text = "2"
                return ("MK1-2 " + Text)
            },
            unlocked :  function()
            {
                return false
            }
        }
    }
})