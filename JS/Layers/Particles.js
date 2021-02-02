addLayer("Particles",
{
    name         : "Particles",
    symbol       : "P",
    resource     : "Particles",
    baseResource : "Energy",
    color        : "#FFFFFF",
    type         : "normal",
    exponent     : 0.5,
    position     : 0,
    row          : 0,
    requires     : new Decimal(10),

    resetDescription:"Merge Energy for ",

    tabFormat:
    [
        "main-display",
        "prestige-button",
        "blank",
        ["display-text",function(){return 'You have ' + format(player.points) + ' Energy'}],
        "blank",
        "upgrades",
    ],

    layerShown()
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
        return player.points
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
        let gain = getResetGain(this.layer)
        if (hasUpgrade("Elements",42))
        {
            player[this.layer].points = player[this.layer].points.add(gain.times(0.05).times(0.01))
        }
    },

    doReset(Layer)
    {
        if (Layer && layers[Layer].row > layers[this.layer].row)
        {
            var listKeep = []
            var upgradeKeep = []
            if (hasMilestone("Elements",1))
            {
                upgradeKeep.push(11,21,31)
            }
            if (hasUpgrade("Elements",43))
            {
                upgradeKeep.push(11,12,13,21,22,23,31,32,33)
            }
            layerDataReset("Particles", listKeep)
            player.Particles.upgrades = upgradeKeep;
        }
    },

    upgrades:
    {
        rows:5,
        cols:5,
        11:
        {
            title       : "P1-1 Generator MK1",
            description : "Produce 1 Bases per second",
            cost        :  new Decimal(1)
        },
        12:
        {
            title       : "P1-2 Charge",
            description : "Energy boosts production",
            cost        :  new Decimal(10),
            effect      :  function()
            {
                value = player.points.add(1).log10().add(1)
                if (hasUpgrade("Particles",22))
                {
                    value = player.points.add(1).log10().times(1.5).add(1)
                }
                return value
            },
            unlocked    :  function()
            {
                return hasUpgrade("Particles",11)
            }
        },
        13:
        {
            title       : "P1-3 Particle Catalyst",
            description : "Particles boost production",
            cost        :  new Decimal(10),
            effect      :  function()
            {
                value = player[this.layer].points.add(1).ln().add(1)
                if (hasUpgrade("Particles",23))
                {
                    value = player[this.layer].points.add(1).ln().times(1.25).add(1)
                }
                return value
            },
            unlocked    :  function()
            {
                return hasUpgrade("Particles",11)
            }
        },
        21:
        {
            title       : "P2-1 Generator MK2",
            description : "Double production",
            cost        :  new Decimal(25),
            effect      :  function()
            {
                return 2
            },
            unlocked    :  function()
            {
                return hasUpgrade("Particles",11)
            }
        },
        22:
        {
            title       : "P2-2 Battery",
            description : "P1-2 is 50% more effcient",
            cost        :  new Decimal(50),
            unlocked    :  function()
            {
                return (hasUpgrade("Particles",12) && hasUpgrade("Particles",21))
            }
        },
        23:
        {
            title       : "P2-3 Efficient Catalyst",
            description : "P1-3 is 25% more effcient",
            cost        :  new Decimal(50),
            unlocked    :  function()
            {
                return (hasUpgrade("Particles",13) && hasUpgrade("Particles",21))
            }
        },
        31:
        {
            title       : "P3-1 Generator MK2+",
            description : "Triple production",
            cost        :  new Decimal(100),
            effect      :  function()
            {
                return 3
            },
            unlocked    :  function()
            {
                return hasUpgrade("Particles",21)
            }
        },
        32:
        {
            title       : "P3-2 Overload",
            description : "Energy and Particles boosts production again",
            cost        :  new Decimal(250),
            effect      :  function()
            {
                value = player[this.layer].points.times(player.points).add(1).log10().add(1)
                if(hasUpgrade("Elements",32))
                {
                    value = value * 1.25
                }
                return value
            },
            unlocked    :  function()
            {
                return (hasUpgrade("Particles",22) && hasUpgrade("Particles",23) && hasUpgrade("Particles",31))
            }
        },
        33:
        {
            title       : "P3-3 Synthesizer",
            description : "Unlock a new layer",
            cost        :  new Decimal(1000),
            unlocked    :  function()
            {
                return hasUpgrade("Particles",32)
            }
        }
    }
})