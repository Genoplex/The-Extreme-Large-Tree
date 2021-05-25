addLayer("Particles",
{
    name          : "Particles",
    symbol        : "Pa",
    resource      : "Particles",
    baseResource  : "Energy",
    baseAmount    :  function()
    {
        return player.points
    },
    color         : "#FFFFFF",
    type          : "normal",
    exponent      :  0.5,
    position      :  0,
    row           :  0,
    requires      :  new Decimal(15),

    resetDescription : "Merge Energy for ",

    hotkeys :
    [
        {
            key:'shift',
            description : 'Press → Shift ← for special descriptions of things'
        },

        {
            key:'ctrl',
            description : 'Press → Ctrl ← to check the composition of the increase'
        },

        {
            key:"a",
            description : "Press → A ← for Particles Reset",
            onPress :  function()
            {
                if (player.Particles.unlocked)
                {
                    doReset("Particles")
                }
            }
        }
    ],

    tooltip :  function()
    {
        return "Layer: Particles\n" + format(player.Particles.points)
    },

    tabFormat :
    {
        "Main": {
            shouldNotify: false,
            content:
            [
                "main-display",
                "prestige-button",
                'blank',
                ['display-text',function()
                    {
                        if (!hasUpgrade("Elements",42))
                        {
                            return ''
                        }
                        return 'You are gaining ' + format(player.Particles.Gain.times(0.01)) + ' Particles per second'
                    }
                ],
                "blank",
                ["display-text",function(){return 'You have ' + format(player.points) + ' Energy'}],
                "blank",
                ["row",[["upgrade", 11],["upgrade",12],["upgrade",13]]],
                ["row",[["upgrade", 21],["upgrade",22],["upgrade",23]]],
                ["row",[["upgrade", 31],["upgrade",32],["upgrade",33]]],
                "blank",
                ["display-text",function()
                    {
                        if (hasUpgrade("Particles",33) && !player.Elemixs.unlocked && !player.Elements.unlocked && !player.ExoticElements.unlocked)
                        {
                            return "<h3>Tip:</h3> You can only choose one layer in row 2 at present"
                        }
                    }
                ],
                "blank",
                ["row",[["upgrade", 41],["upgrade",42],["upgrade",43]]],
            ],
        },
    },

    layerShown :  function()
    {
        return true
    },

    startData :  function()
    {    
        return{
        unlocked       : true,
		points         : new Decimal(0),
        ExoticElements : new Decimal(1),
        Gain           : new Decimal(0),
        }
    },
        
    gainMult :  function()
    {
        mult = new Decimal(1)
        return mult
    },

    gainExp :  function()
    {
        return new Decimal(1)
    },

    update :  function(diff)
    {
        player.Particles.Gain = getResetGain(this.layer)

        if (hasUpgrade("Elements",42) || ((hasUpgrade("ExoticElements",21)) && (getClickableState("ExoticElements",12) !== "Producting") && (getClickableState("ExoticElements",13) !== "Producting") && !hasUpgrade("ExoticElements",32)) || (hasUpgrade("ExoticElements",21) && hasUpgrade("ExoticElements",32)) || (hasUpgrade("Elemixs",42)))
        {
            player.Particles.points = player.Particles.points.add(player.Particles.Gain.times(0.05).times(0.01))
        }
    },

    doReset :  function(Layer)
    {
        if (Layer && layers[Layer].row > layers[this.layer].row)
        {
            listKeep    = []
            upgradeKeep = []
            if (hasUpgrade("Particles",33))
            {
                upgradeKeep.push(33)
            }
            if (hasMilestone("Elements",1))
            {
                upgradeKeep.push(11,21,31)
            }
            if (hasUpgrade("Elements",43) || hasUpgrade("Elemixs",22))
            {
                upgradeKeep.push(11,12,13,21,22,23,31,32,33)
            }
            if (hasMilestone("Elemixs",1))
            {
                upgradeKeep = player.Particles.upgrades
            }
            layerDataReset("Particles")
            player.Particles.upgrades = upgradeKeep;
        }
    },

    upgrades :
    {
        11:
        {
            title       : "PaU1-1 Generator MK1",
            description :  function()
            {
                if (ctrlDown)
                {
                    return '<br>Can\'t be boosted'
                }
                return "<br>Produce 5 Energy per second"
            },
            cost        :  new Decimal(1),
            style    :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        12:
        {
            title       : "PaU1-2 Charge",
            description :  function()
            {
                if (ctrlDown)
                {
                    Text = format(player.points.add(1).log10().add(1))
                    if(hasUpgrade("Particles",22))
                    {
                        Text = Text + "X1.5"
                    }
                    if(hasMilestone("Elemixs",1))
                    {
                        Text = '['+Text+']^' + format(player.Elemixs.TimeEffect)
                    }
                    if(hasUpgrade("Elemixs",31))
                    {
                        Text = Text + "X" + format(upgradeEffect("Elemixs",31))
                    }
                    return '<br>' + Text + '<br>= ' + format(this.effect())
                }
                return "<br>Energy boosts production<br><br>Currently: X" + format(this.effect())
            },
            cost        :  new Decimal(10),
            effect      :  function()
            {
                value = player.points.add(1).log10().add(1)
                if (hasUpgrade("Particles",22))
                {
                    value = value * 1.5
                }
                if (hasMilestone("Elemixs",1))
                {
                    value = value**player.Elemixs.TimeEffect
                }
                if (hasUpgrade("Elemixs",31))
                {
                    value = value*(upgradeEffect("Elemixs",31))
                }
                return value
            },
            unlocked    :  function()
            {
                return hasUpgrade("Particles",11)
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        13:
        {
            title       : "PaU1-3 Particle Catalyst",
            description :  function()
            {
                if (ctrlDown)
                {
                    Text = format(player.Particles.points.add(1).ln().add(1))
                    if(hasUpgrade("Particles",22))
                    {
                        Text = Text + "X1.25"
                    }
                    if(hasMilestone("Elemixs",1))
                    {
                        Text = '['+Text+']^' + format(player.Elemixs.TimeEffect)
                    }
                    if(hasUpgrade("Elemixs",31))
                    {
                        Text = Text + "X" + format(upgradeEffect("Elemixs",31))
                    }
                    return '<br>' + Text + '<br>= ' + format(this.effect())
                }
                return "<br>Particles boost production<br><br>Currently: X" + format(this.effect())
            },
            cost        :  new Decimal(10),
            effect      :  function()
            {
                value = player.Particles.points.add(1).ln().add(1)
                if (hasUpgrade("Particles",23))
                {
                    value = value * 1.25
                }
                if (hasMilestone("Elemixs",1))
                {
                    value = value**player.Elemixs.TimeEffect
                }
                if (hasUpgrade("Elemixs",31))
                {
                    value = value*(upgradeEffect("Elemixs",31))
                }
                return value
            },
            unlocked    :  function()
            {
                return hasUpgrade("Particles",11)
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        21:
        {
            title       : "PaU2-1 Generator MK2",
            description :  function()
            {
                if (ctrlDown)
                {
                    return '<br>Can\'t be boosted'
                }
                return "<br>Double production<br><br>Currently: X2"
            },
            cost        :  new Decimal(25),
            effect      :  function()
            {
                return 2
            },
            unlocked    :  function()
            {
                return hasUpgrade("Particles",11)
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        22:
        {
            title       : "PaU2-2 Battery",
            description :  function()
            {
                if (ctrlDown)
                {
                    return '<br>Can\'t be boosted'
                }
                return "<br>PaU1-2 is 50% more effcient"
            },
            cost        :  new Decimal(50),
            unlocked    :  function()
            {
                return (hasUpgrade("Particles",12) && hasUpgrade("Particles",21))
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        23:
        {
            title       : "PaU2-3 Efficient Catalyst",
            description :  function()
            {
                if (ctrlDown)
                {
                    return '<br>Can\'t be boosted'
                }
                return "<br>PaU1-3 is 25% more effcient"
            },
            cost        :  new Decimal(50),
            unlocked    :  function()
            {
                return (hasUpgrade("Particles",13) && hasUpgrade("Particles",21))
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        31:
        {
            title       : "PaU3-1 Generator MK2+",
            description :  function()
            {
                if (ctrlDown)
                {
                    return '<br>Can\'t be boosted'
                }
                return "<br>Triple production<br><br>Currently: X3"
            },
            cost        :  new Decimal(100),
            effect      :  function()
            {
                return 3
            },
            unlocked    :  function()
            {
                return hasUpgrade("Particles",21)
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        32:
        {
            title       : "PaU3-2 Overload",
            description :  function()
            {
                if (ctrlDown)
                {
                    Text = format(player.Particles.points.times(player.points).add(1).log10().add(1))
                    if(hasMilestone("Elemixs",1))
                    {
                        Text = Text + "^" + format(player.Elemixs.TimeEffect)
                    }
                    if(hasUpgrade("Elemixs",31))
                    {
                        Text = Text + "X" + format(upgradeEffect("Elemixs",31))
                    }
                    if(hasUpgrade("Elements",32))
                    {
                        Text = Text + "X1.25"
                    }
                    return '<br>' + Text + '<br>= ' + format(this.effect())
                }
                return "<br>Energy and Particles boosts production again<br><br>Currently: X" + format(this.effect())
            },
            cost        :  new Decimal(250),
            effect      :  function()
            {
                value = player.Particles.points.times(player.points).add(1).log10().add(1)
                if (hasMilestone("Elemixs",1))
                {
                    value = value**player.Elemixs.TimeEffect
                }
                if (hasUpgrade("Elemixs",31))
                {
                    value = value*(upgradeEffect("Elemixs",31))
                }
                if (hasUpgrade("Elements",32))
                {
                    value = value*1.25
                }
                return value
            },
            unlocked    :  function()
            {
                return (hasUpgrade("Particles",22) && hasUpgrade("Particles",23) && hasUpgrade("Particles",31))
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        33:
        {
            title       : "PaU3-3 Synthesizer",
            description :  function()
            {
                if (ctrlDown)
                {
                    return '<br>Unboostable'
                }
                return "<br>Unlock new layers"
            },
            cost        :  function()
            {
                if (player.ExoticElements.unlocked || player.Elements.unlocked || player.Elemixs.unlocked)
                {
                    x = 0
                    return x
                }
                return 100
            },
            unlocked    :  function()
            {
                return hasUpgrade("Particles",32)
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        41:
        {
            title       : "PaU4-1 Heat",
            description : "<br>Important Property",
            currencyDisplayName  : "Energy",
            currencyInternalName : "points",
            cost        :  new Decimal(5e16),
            unlocked    :  function()
            {
                return false
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        }
    }
})