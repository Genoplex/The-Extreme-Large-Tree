addLayer("Elemixs",
{
    name          : "Elemixs",
    symbol        : "Ei",
    resource      : "Magicource",
    baseResource  : "Particles",      
    baseAmount    :  function()
    {
        return player.Particles.points
    },
    color         : "#FFFFFF",
    type          : "normal",
    exponent      :  1,
    position      :  0,
    row           :  1,
    branches      : ["Particles"],

    requires      :  function()
    {
        {
            if (player.Elements.unlocked && player.ExoticElements.unlocked)
            {
                return (new Decimal(1e200))
            }
            if (player.Elements.unlocked || player.ExoticElements.unlocked)
            {
                return (new Decimal(1e100))
            }
            return (new Decimal(1000))
        }
    },

    resetDescription  :"Mix Particles for ",

    hotkeys :
    [
        {
            key:"x",
            description : "Press → X ← for Elemixs Reset",
            onPress :  function()
            {
                if (player.Elemixs.unlocked)
                {
                    doReset("Elemixs")
                }
            }
        },
    ],

    tooltip :  function()
    {
        return "Layer: Elemix\n" + format(player.Elemixs.points)
    },

    tabFormat:
    {
        "Buyables":
        {
            unlocked :  function()
            {
                return true
            },
            content  :
            [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",function(){return 'You have ' + format(player.Particles.points) + ' Particles'}],
                "blank",
                ["display-text",function(){return '<h3>Tip:</h3> Magicouses boost themselves'}],
                "blank",
                "buyables"
            ]
        },
        "Upgrades":
        {
            unlocked :  function()
            {
                return (getBuyableAmount("Elemixs",11) >= 1)
            },
            content  :
            [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",function(){return 'You have ' + format(player.Particles.points) + ' Particles'}],
                "blank",
                ["display-text",function(){return '<h3>Tip:</h3> Magicouses boost themselves (Press → Ctrl ← to see the effect of upgrades)'}],
                "blank",
                ['row',[["upgrade",11],["upgrade",21],["upgrade",31],["upgrade",41]]],
                ['row',[["upgrade",12],["upgrade",22],["upgrade",32],["upgrade",42]]]
            ]
        },
        "Milestones":
        {
            unlocked :  function()
            {
                return (player.Elemixs.unlocked)
            },
            content  :
            [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",function(){return 'You have ' + format(player.Particles.points) + ' Particles'}],
                "blank",
                ["display-text",function(){return '<h3>Tip:</h3> Magicouses boost themselves'}],
                "blank",
                "milestones"
            ]
        },
        "Natural Elemixs":
        {
            unlocked :  function()
            {
                return (getBuyableAmount("Elemixs",11) >= 1)
            },
            content  :
            [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",function(){return 'You have ' + format(player.Particles.points) + ' Particles'}],
                "blank",
                ["display-text",function(){return '<h3>Tip:</h3> Magicouses boost themselves (Press → Shift ← to see the effect of elemixs)'}],
                "blank",
                ["row",[["clickable",11],["clickable",12],["clickable",13],["clickable",14],["clickable",15],["clickable",16],["clickable",17],["clickable",18],["clickable",19]]],
                "blank",
                ["row",[["clickable",21],["display-text",function(){return "<b>—————> Boosts —————></b>"}],["clickable",22]]],
                ["row",[["display-text",function(){return "<b>↑</b>"}],["upgrade",99],["display-text",function(){return "<b>↓</b>"}]]],
                ["row",[["display-text",function(){return "<b>Boosts</b>"}],["upgrade",98],["display-text",function(){return "<b>Magicouse Loop</b>"}],["upgrade",98],["display-text",function(){return "<b>Boosts</b>"}]]],
                ["row",[["display-text",function(){return "<b>↑</b>"}],["upgrade",99],["display-text",function(){return "<b>↓</b>"}]]],
                ["row",[["clickable",24],["display-text",function(){return "<b><————— Boosts <—————</b>"}],["clickable",23]]],
                "blank",
                ["row",[["clickable",25],["upgrade",97],["clickable",27],["upgrade",97],["clickable",26]]],
            ]
        },
    },

    layerShown :  function()
    {
        return ( player[this.layer].unlocked || ((hasUpgrade("Particles",33)) && ((!player.Elements.unlocked && !player.ExoticElements.unlocked) || (player.Particles.points > 1e200 && player.Elements.unlocked && player.ExoticElements.unlocked) || (player.Particles.points > 1e100 && (player.Elements.unlocked || player.ExoticElements.unlocked)))))
    },

    startData()
    {    
        return{
        unlocked    : false,
        Lock        : ["1","2","3","4"],
        Unlock      : [],
		points      : new Decimal(0),
        Addmode     : new Decimal(1),
        Fire        : new Decimal(0),
        Earth       : new Decimal(0),
        Water       : new Decimal(0),
        Air         : new Decimal(0),
        FireUnlocked  : new Decimal(0),
        EarthUnlocked : new Decimal(0),
        WaterUnlocked : new Decimal(0),
        AirUnlocked   : new Decimal(0),
        FireEffect  : new Decimal(1),
        EarthEffect : new Decimal(1),
        WaterEffect : new Decimal(1),
        AirEffect   : new Decimal(1),
        ActivePower : new Decimal(0),
        SolidPower  : new Decimal(0),
        AbsorbPower : new Decimal(0), 
        FlowPower   : new Decimal(0),
        ActivePowerGain : new Decimal(0),
        SolidPowerGain  : new Decimal(0),
        AbsorbPowerGain : new Decimal(0), 
        FlowPowerGain   : new Decimal(0),
        ActivePowerEffect : new Decimal(1),
        SolidPowerEffect  : new Decimal(1),
        AbsorbPowerEffect : new Decimal(1), 
        FlowPowerEffect   : new Decimal(1),
        Order  : new Decimal(0),
        Chaos  : new Decimal(0),
        Time   : new Decimal(0),
        OrderGain  : new Decimal(0),
        ChaosGain  : new Decimal(0),
        TimeGain   : new Decimal(0),
        OrderEffect : new Decimal(1),
        ChaosEffect : new Decimal(1),
        TimeEffect  : new Decimal(1),
        Average   : new Decimal(0),
        Test   : new Decimal(0),
        Efficiency : new Decimal(0),
        Tick   : new Decimal(0),
        WeatherTime : 0,
        Weather     : 0,
        UpgradeAmount : 0
        }
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
        if (player.Elemixs.Unlock.indexOf("1") >= 0 )
        {
            player.Elemixs.FireUnlocked = 1
        }
        if (player.Elemixs.Unlock.indexOf("2") >= 0 )
        {
            player.Elemixs.EarthUnlocked = 1
        }
        if (player.Elemixs.Unlock.indexOf("3") >= 0 )
        {
            player.Elemixs.WaterUnlocked = 1
        }
        if (player.Elemixs.Unlock.indexOf("4") >= 0 )
        {
            player.Elemixs.AirUnlocked = 1
        }
        
        if ((getClickableState("Elemixs",25) == "Producting") || (getClickableState("Elemixs",26) == "Producting") || (getClickableState("Elemixs",27) == "Producting"))
        {
            Total = player.Elemixs.Fire.add(player.Elemixs.Earth).add(player.Elemixs.Water).add(player.Elemixs.Air)
            player.Elemixs.Average = new Decimal(Total*0.25)

            FireDiffer  = (Math.abs(player.Elemixs.Fire.add(-player.Elemixs.Average)))**2
            EarthDiffer = (Math.abs(player.Elemixs.Earth.add(-player.Elemixs.Average)))**2
            WaterDiffer = (Math.abs(player.Elemixs.Water.add(-player.Elemixs.Average)))**2
            AirDiffer   = (Math.abs(player.Elemixs.Air.add(-player.Elemixs.Average)))**2

            Variance = Math.sqrt((FireDiffer + EarthDiffer + WaterDiffer + AirDiffer)/4)
            player.Elemixs.Efficiency = new Decimal(Variance/player.Elemixs.Average)

            if (getClickableState("Elemixs",25) == "Producting")
            {
                player.Elemixs.Efficiency = new Decimal(1-player.Elemixs.Efficiency)
                if (player.Elemixs.Efficiency < 0)
                {
                    player.Elemixs.Efficiency = 0
                }
                player.Elemixs.OrderGain = new Decimal(player.Elemixs.Average*0.2*player.Elemixs.Efficiency*0.005)
                player.Elemixs.Order = player.Elemixs.Order.add(player.Elemixs.OrderGain.times(0.05))
            }

            if (getClickableState("Elemixs",26) == "Producting")
            {
                if (player.Elemixs.Efficiency > 1)
                {
                    player.Elemixs.Efficiency = 1
                }
                player.Elemixs.ChaosGain = new Decimal(player.Elemixs.Average*0.2*player.Elemixs.Efficiency*0.005)
                player.Elemixs.Chaos = player.Elemixs.Chaos.add(player.Elemixs.ChaosGain.times(0.05))
            }

            if (getClickableState("Elemixs",27) == "Producting")
            {
                player.Elemixs.Tick = player.Elemixs.Tick.add(0.05)
                player.Elemixs.Efficiency = player.Elemixs.Tick.times(0.0001)

                player.Elemixs.TimeGain = new Decimal(player.Elemixs.Average*0.05*player.Elemixs.Efficiency)
                player.Elemixs.Time = player.Elemixs.Time.add(player.Elemixs.TimeGain.times(0.05))
            }

            player.Elemixs.TimeEffect  = player.Elemixs.Time.add(1).log(10).times(0.002).add(1).pow(5)
            player.Elemixs.OrderEffect = player.Elemixs.Order.add(1).log(10).times(0.002).add(1).pow(5)
            player.Elemixs.ChaosEffect = player.Elemixs.Chaos.add(1).log(10).times(0.002).add(1).pow(5)
        }

        player.Elemixs.FlowPowerEffect = player.Elemixs.FlowPower.add(1).log10().times(0.2).add(1).pow(player.Elemixs.ChaosEffect)

        player.Elemixs.ActivePowerEffect = player.Elemixs.ActivePower.add(1).log10().times(0.2).add(1).times(player.Elemixs.FlowPowerEffect).pow(player.Elemixs.ChaosEffect)
        player.Elemixs.SolidPowerEffect  = player.Elemixs.SolidPower.add(1).log10().times(0.2).add(1).times(player.Elemixs.FlowPowerEffect).pow(player.Elemixs.ChaosEffect)
        player.Elemixs.AbsorbPowerEffect = player.Elemixs.AbsorbPower.add(1).log10().times(0.2).add(1).times(player.Elemixs.FlowPowerEffect).pow(player.Elemixs.ChaosEffect)

        player.Elemixs.ActivePowerGain = player.Elemixs.Fire.times(player.Elemixs.SolidPowerEffect)
        player.Elemixs.SolidPowerGain  = player.Elemixs.Earth.times(player.Elemixs.SolidPowerEffect)
        player.Elemixs.AbsorbPowerGain = player.Elemixs.Water.times(player.Elemixs.SolidPowerEffect)
        player.Elemixs.FlowPowerGain   = player.Elemixs.Air.times(player.Elemixs.SolidPowerEffect)

        player.Elemixs.ActivePower     = player.Elemixs.ActivePower.add(player.Elemixs.ActivePowerGain.times(0.05))
        player.Elemixs.SolidPower      = player.Elemixs.SolidPower.add(player.Elemixs.SolidPowerGain.times(0.05))
        player.Elemixs.AbsorbPower     = player.Elemixs.AbsorbPower.add(player.Elemixs.AbsorbPowerGain.times(0.05))
        player.Elemixs.FlowPower       = player.Elemixs.FlowPower.add(player.Elemixs.FlowPowerGain.times(0.05))

        if(player.Elemixs.WeatherTime <= 0)
        {
            player.Elemixs.WeatherTime = Math.round(Math.random()*4800) + 1200
            player.Elemixs.Weather = Math.random()*2 + 1
        }
        player.Elemixs.WeatherTime = player.Elemixs.WeatherTime - 1

        player.Elemixs.UpgradeAmount = player.Particles.upgrades.length + player.Elemixs.upgrades.length - 1
    },

    doReset :  function()
    {

    },

    effect :  function()
    {

    },

    upgrades:
    {
        11:
        {
            title                : "EiU1-1 Thermal Transmission",
            description          :  function()
            {
                if(shiftDown)
                {
                    return "<br>Amount: " + format(player.Elemixs.UpgradeAmount) + "<br>Boosts: X" + format(player.Elemixs.UpgradeAmount*0.1 + 1)
                }
                if(ctrlDown)
                {
                    return "<br>Can\'t be boosted"
                }
                return "<br>The more upgrades, the higher it boosts<br><br>Currently: X" + format(player.Elemixs.UpgradeAmount*0.1+1)
            },
            cost                 :  new Decimal(100),
            unlocked             :  function()
            {
                return (player.Elemixs.FireUnlocked == 1)
            },
            currencyDisplayName  : "Active Power",
            currencyInternalName :  function()
            {
                return "ActivePower"
            },
            currencyLayer        :  function()
            {
                return "Elemixs"
            },
            style                :  function()
            {
                return{
                    "height"     : "150px"
                }
            }
        },
        12:
        {
            fullDisplay :  function()
            {
                Text = "Generator keeps working during the production of order, chaos, time elemixs"
                if(ctrlDown)
                {
                    Text = "Unboostable"
                }
                return "<h3>EiU1-2 Active Component</h3><br><br>" + Text + "<br><br>Cost: 10000 Active Power and 10000 Solid Power"
            },
            unlocked             :  function()
            {
                return ((hasUpgrade("Elemixs",11)) && (player.Elemixs.FireUnlocked == 1) && hasMilestone("Elemixs",1))
            },
            canAfford : function()
            {
                return ((player.Elemixs.ActivePower >= 10000) && (player.Elemixs.SolidPower >= 10000))
            },
            pay       :function()
            {
                player.Elemixs.ActivePower = player.Elemixs.ActivePower.subtract(10000)
                player.Elemixs.SolidPower = player.Elemixs.SolidPower.subtract(10000)
            },
            style     :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        21:
        {
            title                : "EiU2-1 High Density",
            description          :  function()
            {
                if(ctrlDown)
                {
                    return "<br>Can\'t be boosted"
                }
                return "<br> 2.5X production<br><br>Currently: X2.5"
            },
            cost                 :  new Decimal(100),
            unlocked             :  function()
            {
                return (player.Elemixs.EarthUnlocked == 1)
            },
            currencyDisplayName  : "Solid Power",
            currencyInternalName :  function()
            {
                return "SolidPower"
            },
            currencyLayer        :  function()
            {
                return "Elemixs"
            },
            style                :  function()
            {
                return{
                    "height"     : "150px"
                }
            }
        },
        22:
        {
            fullDisplay :  function()
            {
                Text = "Keep Pa Upgrades on reset"
                if(ctrlDown)
                {
                    Text = "Unboostable"
                }
                return "<h3>EiU2-2 Plasticity</h3><br><br>" + Text + "<br><br>Cost: 10000 Solid Power and 10000 Absorb Power"
            },
            unlocked             :  function()
            {
                return ((hasUpgrade("Elemixs",21)) && (player.Elemixs.EarthUnlocked == 1) && hasMilestone("Elemixs",1))
            },
            canAfford : function()
            {
                return ((player.Elemixs.SolidPower >= 10000) && (player.Elemixs.AbsorbPower >= 10000))
            },
            pay       :function()
            {
                player.Elemixs.SolidPower = player.Elemixs.SolidPower.subtract(10000)
                player.Elemixs.AbsorbPower = player.Elemixs.AbsorbPower.subtract(10000)
            },
            style     :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        31:
        {
            title                : "EiU3-1 Dissolution",
            description          :  function()
            {
                if(ctrlDown)
                {
                    Text = "1+0.05X" + format(player.Elemixs.AbsorbPowerEffect)
                    if(hasUpgrade("Elemixs",32))
                    {
                        Text = Text + "X1.75"
                    }
                    return '<br>' + Text + '<br>= ' + format(this.effect())
                }
                return "<br>Absorb Power slightly boosts Pa upgrades<br><br>Currently: X" + format(this.effect())
            },
            cost                 :  new Decimal(100),
            unlocked             :  function()
            {
                return (player.Elemixs.WaterUnlocked == 1)
            },
            currencyDisplayName  : "Absorb Power",
            currencyInternalName :  function()
            {
                return "AbsorbPower"
            },
            currencyLayer        :  function()
            {
                return "Elemixs"
            },
            effect        :  function()
            {
                value = 0.05*(player.Elemixs.AbsorbPowerEffect)
                if(hasUpgrade("Elemixs",32))
                {
                    value = value * 1.75
                }
                return (1 + value)
            },
            style                :  function()
            {
                return{
                    "height"     : "150px",
                }
            }
        },
        32:
        {
            fullDisplay :  function()
            {
                Text = "EiU3-1 is 75% more efficient"
                if(ctrlDown)
                {
                    Text = "Can\'t be boosted"
                }
                return "<h3>EiU3-2 Evaporation</h3><br><br>" + Text + "<br><br>Cost: 10000 Absorb Power and 10000 Flow Power"
            },
            unlocked             :  function()
            {
                return ((hasUpgrade("Elemixs",31)) && (player.Elemixs.WaterUnlocked == 1) && hasMilestone("Elemixs",1))
            },
            canAfford : function()
            {
                return ((player.Elemixs.AbsorbPower >= 10000) && (player.Elemixs.FlowPower >= 10000))
            },
            pay       :function()
            {
                player.Elemixs.AbsorbPower = player.Elemixs.AbsorbPower.subtract(10000)
                player.Elemixs.FlowPower = player.Elemixs.FlowPower.subtract(10000)
            },
            style     :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        41:
        {
            title                : "EiU4-1 Spread",
            description          :  function()
            {
                if(shiftDown)
                {
                    return "<br>Wind Strength: " + format(player.Elemixs.Weather) + "<br>Next Change: " + format(player.Elemixs.WeatherTime/20) + "s"
                }
                if(ctrlDown)
                {
                    return "<br>Can\'t be boosted"
                }
                return "<br>The wind boosts production randomly<br><br>Currently: X" + format(player.Elemixs.Weather)
            },
            cost                 :  new Decimal(100),
            unlocked             :  function()
            {
                return (player.Elemixs.AirUnlocked == 1)
            },
            currencyDisplayName  : "Flow Power",
            currencyInternalName :  function()
            {
                return "FlowPower"
            },
            currencyLayer        :  function()
            {
                return "Elemixs"
            },
            style                :  function()
            {
                return{
                    "height"     : "150px"
                }
            }
        },
        42:
        {
            fullDisplay :  function()
            {
                Text = "Gain 1% of the Particles gain per second"
                if(ctrlDown)
                {
                    Text = "Can\'t be boosted"
                }
                return "<h3>EiU4-2 Dissipate Heat</h3><br><br>" + Text + "<br><br>Cost: 10000 Flow Power and 10000 Active Power"
            },
            unlocked             :  function()
            {
                return ((hasUpgrade("Elemixs",31)) && (player.Elemixs.AirUnlocked == 1) && hasMilestone("Elemixs",1))
            },
            canAfford : function()
            {
                return ((player.Elemixs.FlowPower >= 10000) && (player.Elemixs.ActivePower >= 10000))
            },
            pay       :function()
            {
                player.Elemixs.FlowPower = player.Elemixs.FlowPower.subtract(10000)
                player.Elemixs.ActivePower = player.Elemixs.ActivePower.subtract(10000)
            },
            style     :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        97:
        {
            title : "EiU9-7 Placeholder III",
            cost  :  new Decimal(Infinity),
            style :  function()
            {
                return{
                    "height"  : "1px",
                    "width"   : "17px",
                    "opacity" :  0
                }
            }
        },
        98:
        {
            title : "EiU9-8 Placeholder II",
            cost  :  new Decimal(Infinity),
            style :  function()
            {
                return{
                    "height"  : "1px",
                    "width"   : "115px", 
                    "opacity" :  0
                }
            }
        },
        99:
        {
            title : "EiU9-9 Placeholder I",
            cost  :  new Decimal(Infinity),
            style :  function()
            {
                return{
                    "height"  : "1px",
                    "width"   : "420px", 
                    "opacity" :  0
                }
            }
        }
    },

    milestones : 
    {
        0:
        {
            requirementDescription : "EiM1 - Elemixs Layer Unlocked",
            effectDescription      : "Elemixs starts to produce powers",
            done                   :  function()
            {
                return (player.Elemixs.unlocked)
            }
        },
        1:
        {
            requirementDescription : "EiM2 - 20000 Every Power",
            effectDescription      : "The generates of powers gave birth to the element of surreal. Unlock three new special elemixs",
            done                   :  function()
            {
                return ((player.Elemixs.ActivePower > 20000)&&(player.Elemixs.SolidPower > 20000)&&(player.Elemixs.AbsorbPower > 20000)&&(player.Elemixs.FlowPower > 20000))
            }
        },
        2:
        {
            requirementDescription : "EiM3 - EiU1-2 Bought",
            effectDescription      : "Active power will keep the mechanical parts active during the production of special elemixs. Generate energy when producting order, chaos, time elemixs",
            done                   :  function()
            {
                return (hasUpgrade("Elemixs",12))
            }
        },
        3:
        {
            requirementDescription : "EiM4 - EiU2-2 Bought",
            effectDescription      : "Solid power will save the mechanical components. Keep every Pa upgrades on reset.",
            done                   :  function()
            {
                return (hasUpgrade("Elemixs",22))
            }
        },
        4:
        {
            requirementDescription : "EiM5 - EiU4-2 Bought",
            effectDescription      : "Flow power will dissipate heat and overclock the generator. Gain 1% Particles per second.",
            done                   :  function()
            {
                return (hasUpgrade("Elemixs",22))
            }
        },
        5:
        {
            requirementDescription : "EiM6 - 5000 Every Elemixs(Not Include the special elemixs)(WIP)",
            effectDescription      : "The elemixs start to react with each other. Unlock a new layer.(WIP)",
            done                   :  function()
            {
                return false
            }
        }
    },

    buyables:
    {
        rows:1,
        cols:1,
        11:
        {
            title     : "EiB1 - Quantity of natural elemixs",
            display   :  function()
            {
                let description = "\n<b><h3>Mysterious elemixs start to form\n</h3></b>"
                let start       = "\n<b><h3>Amount: " + getBuyableAmount("Elemixs",11) + " Types</b></h3>"
                let cost        = "\n<b><h3>Cost: " + format(this.cost()) + " Magicouses</h3></b>"
                if (getBuyableAmount("Elemixs",11) > 3)
                {
                    cost        = "\n<b><h3>All natural elemixs has formed</h3></b>"
                }
                return description + start + cost
            },
            cost     :  function()
            {
                if (getBuyableAmount("Elemixs",11) <= 3)
                {
                    return 1
                }
                x = new Decimal(Infinity)
                return x
            },
            effect    :  function()
            {
                return 1
            },
            unlocked  :  function()
            {
                return true
            },
            canAfford :  function()
            {
                return player[this.layer].points.gte(this.cost())
            },
            buy       :  function()
            {
                var Random = Math.floor(Math.random()*(player.Elemixs.Lock.length-1))
                player.Elemixs.Unlock.push(player.Elemixs.Lock.splice(Random,1)[0])
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer,11,getBuyableAmount(this.layer,11).add(1))
            }
        }
    },
    
    clickables:
    {
        11:
        {
            title    : "Add 1",
            unlocked :  function()
            {
                return (getBuyableAmount("Elemixs",11) >= 1)
            },
            canClick :  function()
            {
                return (player.Elemixs.Addmode !== 1)
            },
            onClick  :  function()
            {
                player.Elemixs.Addmode = 1
            },
            style    :  function()
            {
                return{
                    "height" : "45px",
                    "width"  : "75px"
                }
            }
        },
        12:
        {
            title    : "Add 10",
            unlocked :  function()
            {
                return (getBuyableAmount("Elemixs",11) >= 1)
            },
            canClick :  function()
            {
                return (player.Elemixs.Addmode !== 2)
            },
            onClick  :  function()
            {
                player.Elemixs.Addmode = 2
            },
            style    :  function()
            {
                return{
                    "height" : "45px",
                    "width"  : "75px"
                }
            }
        },
        13:
        {
            title    : "Add 100",
            unlocked :  function()
            {
                return (getBuyableAmount("Elemixs",11) >= 1)
            },
            canClick :  function()
            {
                return (player.Elemixs.Addmode !== 3)
            },
            onClick  :  function()
            {
                player.Elemixs.Addmode = 3
            },
            style    :  function()
            {
                return{
                    "height" : "45px",
                    "width"  : "75px"
                }
            }
        },
        14:
        {
            title    : "Add 1000",
            unlocked :  function()
            {
                return (getBuyableAmount("Elemixs",11) >= 1)
            },
            canClick :  function()
            {
                return (player.Elemixs.Addmode !== 4)
            },
            onClick  :  function()
            {
                player.Elemixs.Addmode = 4
            },
            style    :  function()
            {
                return{
                    "height" : "45px",
                    "width"  : "75px"
                }
            }
        },
        15:
        {
            title    : "Add 25%",
            unlocked :  function()
            {
                return (getBuyableAmount("Elemixs",11) >= 1)
            },
            canClick :  function()
            {
                return (player.Elemixs.Addmode !== 5)
            },
            onClick  :  function()
            {
                player.Elemixs.Addmode = 5
            },
            style    :  function()
            {
                return{
                    "height" : "45px",
                    "width"  : "75px"
                }
            }
        },
        16:
        {
            title    : "Add 33%",
            unlocked :  function()
            {
                return (getBuyableAmount("Elemixs",11) >= 1)
            },
            canClick :  function()
            {
                return (player.Elemixs.Addmode !== 6)
            },
            onClick  :  function()
            {
                player.Elemixs.Addmode = 6
            },
            style    :  function()
            {
                return{
                    "height" : "45px",
                    "width"  : "75px"
                }
            }
        },
        17:
        {
            title    : "Add 50%",
            unlocked :  function()
            {
                return (getBuyableAmount("Elemixs",11) >= 1)
            },
            canClick :  function()
            {
                return (player.Elemixs.Addmode !== 7)
            },
            onClick  :  function()
            {
                player.Elemixs.Addmode = 7
            },
            style    :  function()
            {
                return{
                    "height" : "45px",
                    "width"  : "75px"
                }
            }
        },
        18:
        {
            title    : "Add 100%",
            unlocked :  function()
            {
                return (getBuyableAmount("Elemixs",11) >= 1)
            },
            canClick :  function()
            {
                return (player.Elemixs.Addmode !== 8)
            },
            onClick  :  function()
            {
                player.Elemixs.Addmode = 8
            },
            style    :  function()
            {
                return{
                    "height" : "45px",
                    "width"  : "75px"
                }
            }
        },
        19:
        {
            title    : "Divide",
            unlocked :  function()
            {
                return (getBuyableAmount("Elemixs",11) >= 1)
            },
            canClick :  function()
            {
                return (player.Elemixs.Addmode !== 9)
            },
            onClick  :  function()
            {
                player.Elemixs.Addmode = 9
            },
            style    :  function()
            {
                return{
                    "height" : "45px",
                    "width"  : "75px"
                }
            }
        },
        21:
        {
            title    :  function()
            {
                if (player.Elemixs.FireUnlocked == 1)
                {
                    return "EiC1 Fire Elemix"
                }
                return "???"
            },
            display  :  function()
            {
                if (player.Elemixs.FireUnlocked == 0)
                {
                    return "\nUnknown Elemix"
                }
                Description = "\nFire elemixs produce active power which boosts the production of energy"
                if (shiftDown)
                {
                    return Description
                }
                Amount      = "\nAmount: " + format(player.Elemixs.Fire)
                Power       = "\n\nActive Power: " + format(player.Elemixs.ActivePower) + "\nPower Gain: " + format(player.Elemixs.ActivePowerGain) + "/s\nEffect: X" + format(player.Elemixs.ActivePowerEffect)
                Effect = ""
                if (ctrlDown)
                {
                    Power       = "\n\nActive Power: " + format(player.Elemixs.ActivePower) + "\nPower Gain: " + format(player.Elemixs.ActivePowerGain) + "/s"
                    Effect = format(player.Elemixs.ActivePower.add(1).log10().times(0.2).add(1))
                    if(player.Elemixs.AirUnlocked == 1)
                    {
                        Effect   = Effect + 'X' + format(player.Elemixs.FlowPowerEffect)
                    }
                    if(hasMilestone("Elemixs",1))
                    {
                        Effect   = "[" + Effect + "]^" + format(player.Elemixs.ChaosEffect)
                    }
                    Effect = "Effect: " + Effect
                }
                return Amount + Power + "\n" + Effect
            },
            unlocked :  function()
            {
                return true
            },
            canClick :  function()
            {
                if (player.Elemixs.FireUnlocked == 0)
                {
                    return false
                }
                switch(player.Elemixs.Addmode)
                {
                    case 1:
                        if (player.Elemixs.points >= 1)
                        {
                            player.Elemixs.Test = 2
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 2:
                        if (player.Elemixs.points >= 10)
                        {
                            player.Elemixs.Test = 3
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 3:
                        if (player.Elemixs.points >= 100)
                        {
                            player.Elemixs.Test = 4
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 4:
                        if (player.Elemixs.points >= 1000)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 5:
                        if (player.Elemixs.points >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 6:
                        if (player.Elemixs.points >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 7:
                        if (player.Elemixs.points >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 8:
                        if (player.Elemixs.points >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 9:
                        Amount = Math.floor(player.Elemixs.points.times(0.25));
                        if (Amount >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                }
            },
            onClick  :  function()
            {
                switch(player.Elemixs.Addmode)
                {
                    case 1:
                        player.Elemixs.Fire   = player.Elemixs.Fire.add(1);
                        player.Elemixs.points = player.Elemixs.points.add(-1);
                        break;
                    case 2:
                        player.Elemixs.Fire   = player.Elemixs.Fire.add(10);
                        player.Elemixs.points = player.Elemixs.points.add(-10);
                        break;
                    case 3:
                        player.Elemixs.Fire   = player.Elemixs.Fire.add(100);
                        player.Elemixs.points = player.Elemixs.points.add(-100);
                        break;
                    case 4:
                        player.Elemixs.Fire   = player.Elemixs.Fire.add(1000);
                        player.Elemixs.points = player.Elemixs.points.add(-1000);
                        break;
                    case 5:
                        Amount = Math.floor(player.Elemixs.points.times(0.25))
                        if (player.Elemixs.points <= 3)
                        {
                            Amount = 1
                        };
                        player.Elemixs.Fire   = player.Elemixs.Fire.add(Amount);
                        player.Elemixs.points = player.Elemixs.points.add(-Amount);
                        break;
                    case 6:
                        Amount = Math.floor(player.Elemixs.points.times(0.333))
                        if (player.Elemixs.points <= 3)
                        {
                            Amount = 1
                        };
                        player.Elemixs.Fire   = player.Elemixs.Fire.add(Amount);
                        player.Elemixs.points = player.Elemixs.points.add(-Amount);
                        break;
                    case 7:
                        Amount = Math.floor(player.Elemixs.points.times(0.5))
                        if (player.Elemixs.points <= 3)
                        {
                            Amount = 1
                        };
                        player.Elemixs.Fire   = player.Elemixs.Fire.add(Amount);
                        player.Elemixs.points = player.Elemixs.points.add(-Amount);
                        break;
                    case 8:
                        player.Elemixs.Fire   = player.Elemixs.Fire.add(player.Elemixs.points);
                        player.Elemixs.points = player.Elemixs.points.add(-player.Elemixs.points);
                        break;
                    case 9:
                        Amount = Math.floor(player.Elemixs.points.times(1/getBuyableAmount("Elemixs",11)))
                        if(player.Elemixs.FireUnlocked == 1)
                        {
                            player.Elemixs.Fire = player.Elemixs.Fire.add(Amount)
                        }
                        if(player.Elemixs.EarthUnlocked == 1)
                        {
                            player.Elemixs.Earth = player.Elemixs.Earth.add(Amount)
                        }
                        if(player.Elemixs.WaterUnlocked == 1)
                        {
                            player.Elemixs.Water = player.Elemixs.Water.add(Amount)
                        }
                        if(player.Elemixs.AirUnlocked == 1)
                        {
                            player.Elemixs.Air = player.Elemixs.Air.add(Amount)
                        }
                        player.Elemixs.points = player.Elemixs.points.add(-(Amount*getBuyableAmount("Elemixs",11)));
                        break;
                }
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                    "width"  : "240px"
                }
            }
        },
        22:
        {
            title    :  function()
            {
                if (player.Elemixs.EarthUnlocked == 1)
                {
                    return "EiC2 Earth Elemix"
                }
                return "???"
            },
            display  :  function()
            {
                if (player.Elemixs.EarthUnlocked == 0)
                {
                    return "\nUnknown Elemix"
                }
                Description = "\nEarth elemixs produce solid power which boosts the production of powers"
                if (shiftDown)
                {
                    return Description
                }
                Amount      = "\n\nAmount: " + format(player.Elemixs.Earth)
                Power       = "\n\nSolid Power: " + format(player.Elemixs.SolidPower) + "\nPower Gain: " + format(player.Elemixs.SolidPowerGain) + "/s\nEffect: X" + format(player.Elemixs.SolidPowerEffect)
                if (ctrlDown)
                {
                    Power       = "\n\nSolid Power: " + format(player.Elemixs.SolidPower) + "\nPower Gain: " + format(player.Elemixs.SolidPowerGain) + "/s"
                    Effect = format(player.Elemixs.SolidPower.add(1).log10().times(0.2).add(1))
                    if(player.Elemixs.AirUnlocked == 1)
                    {
                        Effect   = Effect + 'X' + format(player.Elemixs.FlowPowerEffect)
                    }
                    if(hasMilestone("Elemixs",1))
                    {
                        Effect   = "[" + Effect + "]^" + format(player.Elemixs.ChaosEffect)
                    }
                    Effect = "Effect: " + Effect
                }
                return Amount + Power + "\n" + Effect
            },
            unlocked :  function()
            {
                return true
            },
            canClick :  function()
            {
                if (player.Elemixs.EarthUnlocked == 0)
                {
                    return false
                }
                switch(player.Elemixs.Addmode)
                {
                    case 1:
                        if (player.Elemixs.points >= 1)
                        {
                            player.Elemixs.Test = 2
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 2:
                        if (player.Elemixs.points >= 10)
                        {
                            player.Elemixs.Test = 3
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 3:
                        if (player.Elemixs.points >= 100)
                        {
                            player.Elemixs.Test = 4
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 4:
                        if (player.Elemixs.points >= 1000)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 5:
                        if (player.Elemixs.points >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 6:
                        if (player.Elemixs.points >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 7:
                        if (player.Elemixs.points >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 8:
                        if (player.Elemixs.points >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 9:
                        Amount = Math.floor(player.Elemixs.points.times(0.25));
                        if (Amount >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                }
            },
            onClick  :  function()
            {
                switch(player.Elemixs.Addmode)
                {
                    case 1:
                        player.Elemixs.Earth   = player.Elemixs.Earth.add(1);
                        player.Elemixs.points = player.Elemixs.points.add(-1);
                        break;
                    case 2:
                        player.Elemixs.Earth   = player.Elemixs.Earth.add(10);
                        player.Elemixs.points = player.Elemixs.points.add(-10);
                        break;
                    case 3:
                        player.Elemixs.Earth   = player.Elemixs.Earth.add(100);
                        player.Elemixs.points = player.Elemixs.points.add(-100);
                        break;
                    case 4:
                        player.Elemixs.Earth   = player.Elemixs.Earth.add(1000);
                        player.Elemixs.points = player.Elemixs.points.add(-1000);
                        break;
                    case 5:
                        Amount = Math.floor(player.Elemixs.points.times(0.25))
                        if (player.Elemixs.points <= 3)
                        {
                            Amount = 1
                        };
                        player.Elemixs.Earth   = player.Elemixs.Earth.add(Amount);
                        player.Elemixs.points = player.Elemixs.points.add(-Amount);
                        break;
                    case 6:
                        Amount = Math.floor(player.Elemixs.points.times(0.333))
                        if (player.Elemixs.points <= 3)
                        {
                            Amount = 1
                        };
                        player.Elemixs.Earth   = player.Elemixs.Earth.add(Amount);
                        player.Elemixs.points = player.Elemixs.points.add(-Amount);
                        break;
                    case 7:
                        Amount = Math.floor(player.Elemixs.points.times(0.5))
                        if (player.Elemixs.points <= 3)
                        {
                            Amount = 1
                        };
                        player.Elemixs.Earth   = player.Elemixs.Earth.add(Amount);
                        player.Elemixs.points = player.Elemixs.points.add(-Amount);
                        break;
                    case 8:
                        player.Elemixs.Earth   = player.Elemixs.Earth.add(player.Elemixs.points);
                        player.Elemixs.points = player.Elemixs.points.add(-player.Elemixs.points);
                        break;                    
                    case 9:
                        Amount = Math.floor(player.Elemixs.points.times(1/getBuyableAmount("Elemixs",11)))
                        if(player.Elemixs.FireUnlocked == 1)
                        {
                            player.Elemixs.Fire = player.Elemixs.Fire.add(Amount)
                        }
                        if(player.Elemixs.EarthUnlocked == 1)
                        {
                            player.Elemixs.Earth = player.Elemixs.Earth.add(Amount)
                        }
                        if(player.Elemixs.WaterUnlocked == 1)
                        {
                            player.Elemixs.Water = player.Elemixs.Water.add(Amount)
                        }
                        if(player.Elemixs.AirUnlocked == 1)
                        {
                            player.Elemixs.Air = player.Elemixs.Air.add(Amount)
                        }
                        player.Elemixs.points = player.Elemixs.points.add(-(Amount*getBuyableAmount("Elemixs",11)));
                        break;
                }
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                    "width"  : "240px"
                }
            }
        },
        23:
        {
            title    :  function()
            {
                if (player.Elemixs.WaterUnlocked == 1)
                {
                    return "EiC3 Water Elemix"
                }
                return "???"
            },
            display  :  function()
            {
                if (player.Elemixs.WaterUnlocked == 0)
                {
                    return "\nUnknown Elemix"
                }
                Description = "\nWater elemixs produce Absorb power which boosts the effect of Ei upgrades"
                if (shiftDown)
                {
                    return Description
                }
                Amount      = "\n\nAmount: " + format(player.Elemixs.Water)
                Power       = "\n\nAbsorb Power: " + format(player.Elemixs.AbsorbPower) + "\nPower Gain: " + format(player.Elemixs.AbsorbPowerGain) + "/s\nEffect: X" + format(player.Elemixs.AbsorbPowerEffect)
                if (ctrlDown)
                {
                    Power       = "\n\nAbsorb Power: " + format(player.Elemixs.AbsorbPower) + "\nPower Gain: " + format(player.Elemixs.AbsorbPowerGain) + "/s"
                    Effect = format(player.Elemixs.AbsorbPower.add(1).log10().times(0.2).add(1))
                    if(player.Elemixs.AirUnlocked == 1)
                    {
                        Effect   = Effect + 'X' + format(player.Elemixs.FlowPowerEffect)
                    }
                    if(hasMilestone("Elemixs",1))
                    {
                        Effect   = "[" + Effect + "]^" + format(player.Elemixs.ChaosEffect)
                    } 
                    Effect = "Effect: " + Effect
                }
                return Amount + Power + "\n" + Effect
            },
            unlocked :  function()
            {
                return true
            },
            canClick :  function()
            {
                if (player.Elemixs.WaterUnlocked == 0)
                {
                    return false
                }
                switch(player.Elemixs.Addmode)
                {
                    case 1:
                        if (player.Elemixs.points >= 1)
                        {
                            player.Elemixs.Test = 2
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 2:
                        if (player.Elemixs.points >= 10)
                        {
                            player.Elemixs.Test = 3
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 3:
                        if (player.Elemixs.points >= 100)
                        {
                            player.Elemixs.Test = 4
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 4:
                        if (player.Elemixs.points >= 1000)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 5:
                        if (player.Elemixs.points >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 6:
                        if (player.Elemixs.points >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 7:
                        if (player.Elemixs.points >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 8:
                        if (player.Elemixs.points >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 9:
                        Amount = Math.floor(player.Elemixs.points.times(0.25));
                        if (Amount >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                }
            },
            onClick  :  function()
            {
                switch(player.Elemixs.Addmode)
                {
                    case 1:
                        player.Elemixs.Water   = player.Elemixs.Water.add(1);
                        player.Elemixs.points = player.Elemixs.points.add(-1);
                        break;
                    case 2:
                        player.Elemixs.Water   = player.Elemixs.Water.add(10);
                        player.Elemixs.points = player.Elemixs.points.add(-10);
                        break;
                    case 3:
                        player.Elemixs.Water   = player.Elemixs.Water.add(100);
                        player.Elemixs.points = player.Elemixs.points.add(-100);
                        break;
                    case 4:
                        player.Elemixs.Water   = player.Elemixs.Water.add(1000);
                        player.Elemixs.points = player.Elemixs.points.add(-1000);
                        break;
                    case 5:
                        Amount = Math.floor(player.Elemixs.points.times(0.25))
                        if (player.Elemixs.points <= 3)
                        {
                            Amount = 1
                        };
                        player.Elemixs.Water   = player.Elemixs.Water.add(Amount);
                        player.Elemixs.points = player.Elemixs.points.add(-Amount);
                        break;
                    case 6:
                        Amount = Math.floor(player.Elemixs.points.times(0.333))
                        if (player.Elemixs.points <= 3)
                        {
                            Amount = 1
                        };
                        player.Elemixs.Water   = player.Elemixs.Water.add(Amount);
                        player.Elemixs.points = player.Elemixs.points.add(-Amount);
                        break;
                    case 7:
                        Amount = Math.floor(player.Elemixs.points.times(0.5))
                        if (player.Elemixs.points <= 3)
                        {
                            Amount = 1
                        };
                        player.Elemixs.Water   = player.Elemixs.Water.add(Amount);
                        player.Elemixs.points = player.Elemixs.points.add(-Amount);
                        break;
                    case 8:
                        player.Elemixs.Water   = player.Elemixs.Water.add(player.Elemixs.points);
                        player.Elemixs.points = player.Elemixs.points.add(-player.Elemixs.points);
                        break;
                    case 9:
                        Amount = Math.floor(player.Elemixs.points.times(1/getBuyableAmount("Elemixs",11)))
                        if(player.Elemixs.FireUnlocked == 1)
                        {
                            player.Elemixs.Fire = player.Elemixs.Fire.add(Amount)
                        }
                        if(player.Elemixs.EarthUnlocked == 1)
                        {
                            player.Elemixs.Earth = player.Elemixs.Earth.add(Amount)
                        }
                        if(player.Elemixs.WaterUnlocked == 1)
                        {
                            player.Elemixs.Water = player.Elemixs.Water.add(Amount)
                        }
                        if(player.Elemixs.AirUnlocked == 1)
                        {
                            player.Elemixs.Air = player.Elemixs.Air.add(Amount)
                        }
                        player.Elemixs.points = player.Elemixs.points.add(-(Amount*getBuyableAmount("Elemixs",11)));
                        break;
                }
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                    "width"  : "240px"
                }
            }
        },
        24:
        {
            title    :  function()
            {
                if (player.Elemixs.AirUnlocked == 1)
                {
                    return "EiC4 Air Elemix"
                }
                return "???"
            },
            display  :  function()
            {
                if (player.Elemixs.AirUnlocked == 0)
                {
                    return "\nUnknown Elemix"
                }
                Description = "\nAir elemixs produce Flow power which boosts the effect of powers "
                if (shiftDown)
                {
                    return Description
                }
                Amount      = "\n\nAmount: " + format(player.Elemixs.Air)
                Power       = "\n\nFlow Power: " + format(player.Elemixs.FlowPower) + "\nPower Gain: " + format(player.Elemixs.FlowPowerGain) + "/s\nEffect: X" + format(player.Elemixs.FlowPowerEffect)
                if (ctrlDown && hasMilestone("Elemixs",1))
                {
                    Power = "\n\nFlow Power: " + format(player.Elemixs.FlowPower) + "\nPower Gain: " + format(player.Elemixs.FlowPowerGain) + "/s\nEffect: " + format(player.FlowPower.add(1).log(10).add(1)) + "^" + format(player.Elemixs.ChaosEffect)
                }
                return Amount + Power
            },
            unlocked :  function()
            {
                return true
            },
            canClick :  function()
            {
                if (player.Elemixs.AirUnlocked == 0)
                {
                    return false
                }
                switch(player.Elemixs.Addmode)
                {
                    case 1:
                        if (player.Elemixs.points >= 1)
                        {
                            player.Elemixs.Test = 2
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 2:
                        if (player.Elemixs.points >= 10)
                        {
                            player.Elemixs.Test = 3
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 3:
                        if (player.Elemixs.points >= 100)
                        {
                            player.Elemixs.Test = 4
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 4:
                        if (player.Elemixs.points >= 1000)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 5:
                        if (player.Elemixs.points >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 6:
                        if (player.Elemixs.points >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 7:
                        if (player.Elemixs.points >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 8:
                        if (player.Elemixs.points >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    case 9:
                        Amount = Math.floor(player.Elemixs.points.times(0.25));
                        if (Amount >= 1)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                }
            },
            onClick  :  function()
            {
                switch(player.Elemixs.Addmode)
                {
                    case 1:
                        player.Elemixs.Air   = player.Elemixs.Air.add(1);
                        player.Elemixs.points = player.Elemixs.points.add(-1);
                        break;
                    case 2:
                        player.Elemixs.Air   = player.Elemixs.Air.add(10);
                        player.Elemixs.points = player.Elemixs.points.add(-10);
                        break;
                    case 3:
                        player.Elemixs.Air   = player.Elemixs.Air.add(100);
                        player.Elemixs.points = player.Elemixs.points.add(-100);
                        break;
                    case 4:
                        player.Elemixs.Air   = player.Elemixs.Air.add(1000);
                        player.Elemixs.points = player.Elemixs.points.add(-1000);
                        break;
                    case 5:
                        Amount = Math.floor(player.Elemixs.points.times(0.25))
                        if (player.Elemixs.points <= 3)
                        {
                            Amount = 1
                        };
                        player.Elemixs.Air   = player.Elemixs.Air.add(Amount);
                        player.Elemixs.points = player.Elemixs.points.add(-Amount);
                        break;
                    case 6:
                        Amount = Math.floor(player.Elemixs.points.times(0.333))
                        if (player.Elemixs.points <= 3)
                        {
                            Amount = 1
                        };
                        player.Elemixs.Air   = player.Elemixs.Air.add(Amount);
                        player.Elemixs.points = player.Elemixs.points.add(-Amount);
                        break;
                    case 7:
                        Amount = Math.floor(player.Elemixs.points.times(0.5))
                        if (player.Elemixs.points <= 3)
                        {
                            Amount = 1
                        };
                        player.Elemixs.Air   = player.Elemixs.Air.add(Amount);
                        player.Elemixs.points = player.Elemixs.points.add(-Amount);
                        break;
                    case 8:
                        player.Elemixs.Air   = player.Elemixs.Air.add(player.Elemixs.points);
                        player.Elemixs.points = player.Elemixs.points.add(-player.Elemixs.points);
                        break;
                    case 9:
                        Amount = Math.floor(player.Elemixs.points.times(1/getBuyableAmount("Elemixs",11)))
                        if(player.Elemixs.FireUnlocked == 1)
                        {
                            player.Elemixs.Fire = player.Elemixs.Fire.add(Amount)
                        }
                        if(player.Elemixs.EarthUnlocked == 1)
                        {
                            player.Elemixs.Earth = player.Elemixs.Earth.add(Amount)
                        }
                        if(player.Elemixs.WaterUnlocked == 1)
                        {
                            player.Elemixs.Water = player.Elemixs.Water.add(Amount)
                        }
                        if(player.Elemixs.AirUnlocked == 1)
                        {
                            player.Elemixs.Air = player.Elemixs.Air.add(Amount)
                        }
                        player.Elemixs.points = player.Elemixs.points.add(-(Amount*getBuyableAmount("Elemixs",11)));
                        break;
                }
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                    "width"  : "240px"
                }
            }
        },
        25:
        {
            title    :  function()
            {
                return "EiC5 Order Elemixs"
            },
            display  :  function()
            {
                Description = "\nBoosts energy produnction.\nThe smaller the quantity difference of the four elemixs and the higher the average, the higher the order elemixs production"
                if (shiftDown)
                {
                    return Description
                }
                Amount = "\nAmount: "  + format(player.Elemixs.Order)
                Gain   = ""
                if (getClickableState("Elemixs",25) == "Producting")
                {
                    Gain = "\nElemixs Gain: " + format(player.Elemixs.OrderGain) + "/s"
                }
                Efficiency = ""
                if (getClickableState("Elemixs",25) == "Producting")
                {
                    Efficiency = "\nGain Efficiency: " + format(player.Elemixs.Efficiency*100) + "%"
                }
                Effect = "\nEffect: ^" + format(player.Elemixs.OrderEffect)
                State  = "\n\nClick to start the production"
                if (getClickableState("Elemixs",25) == "Producting")
                {
                    State = "\n\n<b>Order producting!</b>"
                }
                if (getClickableState("Elemixs",26) == "Producting")
                {
                    State = "\n\n<b>Chaos producting! →</b>"
                }
                if (getClickableState("Elemixs",27) == "Producting")
                {
                    State = "\n\n<b>Time producting! →</b>"
                }
                return Amount + Gain + Efficiency + Effect + State
            },
            unlocked :  function()
            {
                return hasMilestone("Elemixs",1)
            },
            canClick :  function()
            {
                return ((getClickableState("Elemixs",26) !== "Producting") && (getClickableState("Elemixs",27) !== "Producting"))
            },
            onClick  :  function()
            {
                switch(getClickableState("Elemixs",25))
                {
                    case "":
                        player[this.layer].clickables[this.id] = "Producting"
                        break
                    case "Producting":
                        player[this.layer].clickables[this.id] = ""
                        break
                }
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                    "width"  : "215px"
                }
            }
        },
        26:
        {
            title    :  function()
            {
                return "EiC7 Chaos Elemixs"
            },
            display  :  function()
            {
                Description = "\nBoosts power effect.\nThe larger the quantity difference of the four elemixs and the higher the average, the higher the chaos elemixs production"
                if (shiftDown)
                {
                    return Description
                }
                Amount = "\nAmount: "  + format(player.Elemixs.Chaos)
                Gain   = ""
                if (getClickableState("Elemixs",26) == "Producting")
                {
                    Gain = "\nElemixs Gain: " + format(player.Elemixs.ChaosGain) + "/s"
                }
                Effect = "\nEffect: ^" + format(player.Elemixs.ChaosEffect)
                Efficiency = ""
                if (getClickableState("Elemixs",26) == "Producting")
                {
                    Efficiency = "\nGain Efficiency: " + format(player.Elemixs.Efficiency*100) + "%"
                }
                State  = "\n\nClick to start the production"
                if (getClickableState("Elemixs",25) == "Producting")
                {
                    State = "\n\n<b>← Order producting!</b>"
                }
                if (getClickableState("Elemixs",26) == "Producting")
                {
                    State = "\n\n<b>Chaos producting!</b>"
                }
                if (getClickableState("Elemixs",27) == "Producting")
                {
                    State = "\n\n<b>← Time producting!</b>"
                }
                return Amount + Gain + Efficiency + Effect + State
            },
            unlocked :  function()
            {
                return hasMilestone("Elemixs",1)
            },
            canClick :  function()
            {
                return ((getClickableState("Elemixs",25) !== "Producting") && (getClickableState("Elemixs",27) !== "Producting"))
            },
            onClick  :  function()
            {
                switch(getClickableState("Elemixs",26))
                {
                    case "":
                        player[this.layer].clickables[this.id] = "Producting"
                        break
                    case "Producting":
                        player[this.layer].clickables[this.id] = ""
                        break
                }
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                    "width"  : "215px"
                }
            }
        },
        27:
        {
            title    :  function()
            {
                return "EiC6 Time Elemixs"
            },
            display  :  function()
            {
                Description = "\nBoosts Pa and Ei Upgrades(Not all), Ei Buyables effect and power gain.\nThe production of time elemixs increases with time."
                if (shiftDown)
                {
                    return Description
                }
                Amount = "\nAmount: "  + format(player.Elemixs.Time)
                Gain   = ""
                if (getClickableState("Elemixs",27) == "Producting")
                {
                    Gain = "\nElemixs Gain: " + format(player.Elemixs.TimeGain) + "/s"
                }
                Effect = "\nEffect: ^" + format(player.Elemixs.TimeEffect)
                Efficiency = ""
                if (getClickableState("Elemixs",27) == "Producting")
                {
                    Efficiency = "\nGain Efficiency: " + format(player.Elemixs.Efficiency*100) + "%"
                }
                State  = "\n\nClick to start the production"
                if (getClickableState("Elemixs",25) == "Producting")
                {
                    State = "\n\n<b>← Order producting!</b>"
                }
                if (getClickableState("Elemixs",26) == "Producting")
                {
                    State = "\n\n<b>Chaos producting! →</b>"
                }
                if (getClickableState("Elemixs",27) == "Producting")
                {
                    State = "\n\n<b>Time producting!</b>"
                }
                return Amount + Gain + Efficiency + Effect + State
            },
            unlocked :  function()
            {
                return hasMilestone("Elemixs",1)
            },
            canClick :  function()
            {
                return ((getClickableState("Elemixs",25) !== "Producting") && (getClickableState("Elemixs",26) !== "Producting"))
            },
            onClick  :  function()
            {
                player.Elemixs.Tick = new Decimal(0)
                switch(getClickableState("Elemixs",27))
                {
                    case "":
                        player[this.layer].clickables[this.id] = "Producting"
                        break
                    case "Producting":
                        player[this.layer].clickables[this.id] = ""
                        break
                }
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                    "width"  : "215px",
                }
            }
        }
    },
})