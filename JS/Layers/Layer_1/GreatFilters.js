addLayer("GreatFilters",
{
    name     : "The Great Filter",
    symbol   : "GF",
    color    : "#cccccc",
    type     : "none",
    position :  10,
    row      :  0,

    tooltip :  function()
    {
        return "The Great Filter"
    },

    tabFormat:
    [
        "blank",
        ["display-text",function(){return 'You have passed x Great Filters'}],
        "blank",
        ["display-text",function(){return 'Under construction ᕕ( ᐛ )ᕗ'}],
        "blank",
        ["display-text",function(){return 'test'}],
        "blank",
        "clickables",
        "blank",
        "buyables"
    ],

    layerShown :  function()
    {
        return hasMilestone("Substances",5)
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

    doReset :  function(Layer)
    {
        if (Layer && layers[Layer].row > layers[this.layer].row)
        {
            var buyableKeep = []
            buyableKeep = player.GreatFilters.buyables
            layerDataReset("GreatFilters")
            player.GreatFilters.buyables = buyableKeep
        }
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
                if(getBuyableAmount("GreatFilters",11) < 1)
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
                return "<b><h3>\nLives need energy to stay alive\n\n1e16 energy is needed</h3></b>"
            },
            unlocked  :  function()
            {
                if(getBuyableAmount("GreatFilters",12) < 1)
                {
                    return true
                }
                return false
            },
            cost      :  function()
            {
                x = new Decimal(1e16)
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

