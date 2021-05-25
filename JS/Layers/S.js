addLayer("GreatFilters",
{
    name   : "The Great Filter",
    symbol : "GF",
    color  : "#cccccc",
    type   : "none",
    row    : "side",

    
    tabFormat:
    [
        "blank",
        ["display-text",function(){return 'You have passed x Great Filters'}],
        "blank",
        ["display-text",function(){return 'Under construction (ᐛ)'}],
        "blank",
        "blank",
        "clickables",
        "blank",
        "buyables"
    ],

    tooltip()
    {
        return ("The Great Filter")
    },

    layerShown()
    {
        return true
    },

    startData()
    {
        return{
            unlocked: true,
        }
    },

    doReset :  function(resettingLayer)
    {
        player.resetTime = 0
        if (resettingLayer == "Substances")
        {
            upgradeKeep = player.Elements.upgrades
            buyableKeep = player.Elements.buyables
            milestoneKeep = player.Elements.milestones
            layerDataReset("Elements")
            player.Elements.upgrades = upgradeKeep
            player.Elements.buyables = buyableKeep
            player.Elements.milestones = milestoneKeep
        }
    },

    canBuyMax :  function()
    {
        return true
    },

    layerShown :  function()
    {
        return ( player[this.layer].unlocked || ((hasUpgrade("Particles",33)) && ((!player.Elemixs.unlocked && !player.ExoticElements.unlocked) || (player.Particles.points > 1e200 && player.Elemixs.unlocked && player.ExoticElements.unlocked) || (player.Particles.points > 1e100 && (player.Elemixs.unlocked || player.ExoticElements.unlocked)))))
    },

    startData :  function()
    {    
        return{
            unlocked  : false,
            points    : new Decimal(0),
            best      : new Decimal(0)
        }
    },
    
    effect :  function()
    {
        atom_multiple = player.Elements.points
        if (!(hasUpgrade("Elements",41)))
        {
            atom_multiple  = atom_multiple.pow(0.75).add(1)
        }
        if (hasUpgrade("Elements",41))
        {
            atom_multiple  = atom_multiple.pow(0.95).add(1)
        }
        buyable11_multiple = new Decimal(1.1).pow(getBuyableAmount("Elements",11))
        main_multiple      = atom_multiple * buyable11_multiple
        return {atom_multiple, buyable11_multiple, main_multiple}
    },
        
    baseAmount :  function()
    {
        return player.points
    },
        
    clickables:
    {
        rows: 2,
        cols: 5,
        11:
        {
            title    : "GF1-1 Life Barrier",
            display  :  function()
            {
                TextGF1 = "The Great Filter is stopping you! Break the first filter to unlock a new layer!"
                if(getClickableState("GreatFilters",11) == "Done")
                {
                    TextGF1 = "You have break the first filter! New Layer is unlocked"
                }
                return TextGF1
            },
            unlocked :  function()
            {
                return true
            },
            canClick :  function()
            {
                return ((getClickableState("GreatFilters",11) !== "Done") && (getBuyableAmount("GreatFilters",11)>0) && getBuyableAmount("GreatFilters",12)>0)
            },
            onClick  :  function()
            {
                player[this.layer].clickables[this.id] = "Done"
            },
            style    :  function()
            {
                if(getClickableState("GreatFilters",11) == "Done")
                {
                    return{'background':'green'}
                }
            }
        }
    },

    buyables:
    {
        rows:5,
        cols:5,
        11:
        {
            title     : "GF1-1 Material Basis",
            display   :  function()
            {
                return "<b><h3>\nThe Basis you need to form lives\n\nM1-1, M1-2, M1-6 is needed</h3></b>"
            },
            unlocked  :  function()
            {
                if((player.Substances.unlocked) && (getBuyableAmount("GreatFilters",11) < 1))
                {
                    return true
                }
                return false
            },
            cost      :  function()
            {
                if ((hasUpgrade("Substances",11)) && (hasUpgrade("Substances",12)) && (hasUpgrade("Substances",16)) && (getBuyableAmount("GreatFilters",11) < 1))
                {
                    x = new Decimal(0)
                }
                else
                {
                    x = new Decimal(Infinity)
                }
                return x
            },
            canAfford :  function()
            {
                return player.points.gte(this.cost())
            },
            buy       :  function()
            {
                setBuyableAmount(this.layer,11,getBuyableAmount(this.layer,11).add(1))
            },
        },
        12:
        {
            title     : "GF1-2 Energy Basis",
            display   :  function()
            {
                return "<b><h3>\nLives need energy to stay alive\n\n1e14 energy is needed</h3></b>"
            },
            unlocked  :  function()
            {
                if((player.Substances.unlocked) && (getBuyableAmount("GreatFilters",12) < 1))
                {
                    return true
                }
                return false
            },
            cost      :  function()
            {
                x = new Decimal(1e14)
                return x
            },
            canAfford :  function()
            {
                return player.points.gte(this.cost())
            },
            buy       :  function()
            {
                setBuyableAmount(this.layer,12,getBuyableAmount(this.layer,12).add(1))
            }
        }
    }
})