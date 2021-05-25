addLayer("Elements",
{
    name          : "Elements",
    symbol        : "Ee",
    resource      : "Atoms",
    baseResource  : "Particles",
    baseAmount    :  function()
    {
        return player.Particles.points
    },
    color         : "#FFFFFF",
    type          : "normal",
    exponent      :  1,
    position      :  1,
    row           :  1,
    branches      : ["Particles"],

    requires      :  function()
    {
        {
            if (player.Elemixs.unlocked && player.ExoticElements.unlocked)
            {
                return (new Decimal(1e200))
            }
            if (player.Elemixs.unlocked || player.ExoticElements.unlocked)
            {
                return (new Decimal(1e100))
            }
            return (new Decimal(1000))
        }
    },

    resetDescription : "Combine Particles for ",

    hotkeys :
    [
        {
            key:"s",
            description : "Press → S ← for Elements Reset",
            onPress :  function()
            {
                if (player.Elements.unlocked)
                {
                    doReset("Elements")
                }
            }
        }
    ],

    tooltip :  function()
    {
        return "Layer: Elements\n" + format(player.Elements.points)
    },

    tabFormat :
    {
        "Upgrades":
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
                ["display-text",function(){return '<h3>Tip:</h3> Atoms boosts production'}],
                "blank",
                ["display-text",function(){return 'You have ' + format(player.Elements.points) + ' Atoms and they boost production by ' + format(tmp["Elements"].effect.atom_multiple) + "x" }],
                "blank",
                "upgrades",
                "clickables",
            ]
        },
        "Buyables":
        {
            unlocked :  function()
            {
                return hasMilestone("Elements",2)
            },
            content  :
            [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",function(){return 'You have ' + format(player.Particles.points) + ' Particles'}],
                "blank",
                ["display-text",function(){return '<h3>Tip:</h3> Atoms boosts production'}],
                "blank",
                ["display-text",function(){return 'You have ' + format(player.Elements.points) + ' Atoms and they boost production by ' + format(tmp["Elements"].effect.atom_multiple) + "x" }],
                "blank",
                "buyables",
            ]
        },
        "Milestones":
        {
            unlocked :  function()
            {
                return (player.Elements.unlocked)
            },
            content  :
            [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",function(){return 'You have ' + format(player.Particles.points) + ' Particles'}],
                "blank",
                ["display-text",function(){return '<h3>Tip:</h3> Atoms boosts production'}],
                "blank",
                ["display-text",function(){return 'You have ' + format(player.Elements.points) + ' Atoms and they boost production by ' + format(tmp["Elements"].effect.atom_multiple) + "x" }],
                "blank",
                "milestones"
            ]
        }
    },

    layerShown :  function()
    {
        return ( player[this.layer].unlocked || ((hasUpgrade("Particles",33)) && ((!player.Elemixs.unlocked && !player.ExoticElements.unlocked) || (player.Particles.points > 1e200 && player.Elemixs.unlocked && player.ExoticElements.unlocked) || (player.Particles.points > 1e100 && (player.Elemixs.unlocked || player.ExoticElements.unlocked)))))
    },
    
    startData :  function()
    {    
        return{
            unlocked    : false,
            points      : new Decimal(0),
            Resettime   : new Decimal(0),
        }
    },

    gainMult :  function()
    {
        mult = new Decimal(1)
        return mult
    },

    gainExp : function()
    {
        return new Decimal(1)
    },

    update :  function(diff)
    {
        player.Elements.Resettime = player.Elements.Resettime.add(0.05)
    },

    doReset :  function(Layer)
    {
        if (Layer && layers[Layer].row > layers[this.layer].row)
        {
            var upgradeKeep = []
            var buyableKeep = []
            var milestoneKeep = []
            if (hasMilestone("Substances",2))
            {
                buyableKeep = player.Elements.buyables
            }
            if (hasMilestone("Substances",3))
            {
                milestoneKeep = player.Elements.milestones
            }
            if (hasMilestone("Substances",1))
            {
                upgradeKeep = player.Elements.upgrades
            }
            layerDataReset("Elements")
            player.Elements.upgrades = upgradeKeep
            player.Elements.buyables = buyableKeep
            player.Elements.milestones = milestoneKeep
        }
        player.Elements.Resettime = new Decimal(0)
    },

    effect :  function()
    {
        atom_multiple = player.Elements.points
        if (!(hasUpgrade("Elements",41)))
        {
            atom_multiple  = atom_multiple.pow(0.6).add(1)
        }
        if (hasUpgrade("Elements",41))
        {
            atom_multiple  = atom_multiple.pow(0.75).add(1)
        }
        buyable11_multiple = new Decimal(1.1).pow(getBuyableAmount("Elements",11))
        main_multiple      = atom_multiple * buyable11_multiple
        return {atom_multiple, buyable11_multiple, main_multiple}
    },

    upgrades :
    {
        11:
        {
            title       : "EeU1-1A Generator MK3-Speed",
            description :  function()
            {
                if(ctrlDown)
                {
                    Text_Initial = "<br>Initial: 50<br>"
                    Text_Reduce = "<br>Reduce: 1/s"
                    if(hasUpgrade("Elements",21))
                    {
                        Text_Initial = "<br>Initial: 50X" + format(player.Elements.points.add(1).ln().times(0.05).add(1)) + "<br>= " + format(player.Elements.points.add(1).ln().times(0.05).add(1).times(50)) + "<br>"
                    }
                    if(hasUpgrade("Elements",31))
                    {
                        Reduce = player.Elements.points.pow(0.1)
                        Reduce = 1 / Reduce
                        if (Reduce > 1 || Reduce < 0)
                        {
                            Reduce = 1
                        }
                        Text_Reduce = "<br>Reduce: " + format(Reduce) + "/s"
                    }
                    return Text_Initial + Text_Reduce
                }
                return "<br>Time resistance. Locks B and C<br><br>Currently: X" + format(this.effect())
            },
            cost        :  function()
            {
                if ((hasUpgrade("Elements",12) && !(hasUpgrade("Elements",51))) || (hasUpgrade("Elements",13) && !(hasUpgrade("Elements",51)) || (hasUpgrade("Elements",12) && hasUpgrade("Elements",13) && hasUpgrade("Elements",51))))
                {
                    return Infinity
                }
                return 5
            },
            effect      :  function()
            {
                time = player.Elements.Resettime
                initial = 50
                if (hasUpgrade("Elements",21))
                {
                    initial = player.Elements.points.add(1).ln().times(0.05).add(1).times(50)
                }
                if (!hasUpgrade("Elements",31))
                {
                    reduce = time
                }
                if (hasUpgrade("Elements",31))
                {
                    reduce_multiple = player.Elements.points.pow(0.1)
                    reduce_multiple = 1 / reduce_multiple
                    if (reduce_multiple > 1 || reduce_multiple < 0)
                    {
                        reduce_multiple = 1
                    }
                    reduce = time * reduce_multiple
                }
                value = initial - reduce
                if (value < 0.1)
                {
                    value = 0.1
                }
                return value
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        12:
        {
            title       : "EeU1-1B Generator MK3-Normal",
            description :  function()
            {
                if(ctrlDown)
                {
                    Text = "<br>10"
                    if(hasUpgrade("Elements",22))
                    {
                        Text = Text + "X1.25"
                    }
                    return Text + "<br>= " + format(this.effect())
                }
                return "<br>Stable working. Locks A and C<br><br>Currently: X20"
            },
            cost        :  function()
            {
                if ((hasUpgrade("Elements",11) && !(hasUpgrade("Elements",51))) || (hasUpgrade("Elements",13) && !(hasUpgrade("Elements",51)) || (hasUpgrade("Elements",11) && hasUpgrade("Elements",13) && hasUpgrade("Elements",51))))
                {
                    return Infinity
                }
                return 5
            },
            effect      :  function()
            {
                if (hasUpgrade("Elements",22))
                {
                    return 12.5
                }
                return 10
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
            title       : "EeU1-1C Generator MK3-Time",
            description :  function()
            {
                if(ctrlDown)
                {
                    Text_Initial = "<br>Initial: 1<br>"
                    Text_Increase = "<br>Increase: 0.1/s"
                    if(hasUpgrade("Elements",23))
                    {
                        Text_Initial = "<br>Initial: " + format(player.Elements.points.add(1).ln().times(0.1).add(1)) + "<br>"
                    }
                    if(hasUpgrade("Elements",33))
                    {
                        Increase = player.Elements.points.pow(0.2)
                        if (Increase < 1)
                        {
                            Increase = 1
                        }
                        Text_Increase = "<br>Increase: 0.1X" + format(Increase) + "<br>= " + format(0.1 * Increase)
                    }
                    return Text_Initial + Text_Increase
                }
                return "<br>Time conductance. Locks A and B<br><br>Currently: X" + format(this.effect())
            },
            cost        :  function()
            {
                if ((hasUpgrade("Elements",11) && !(hasUpgrade("Elements",51))) || (hasUpgrade("Elements",12) && !(hasUpgrade("Elements",51)) || (hasUpgrade("Elements",11) && hasUpgrade("Elements",12) && hasUpgrade("Elements",51))))
                {
                    return Infinity
                }
                return 5 
            },
            effect      :  function()
            {
                time = player.Elements.Resettime
                if (!(hasUpgrade("Elements",23)))
                {
                    begin = 1
                }
                if (hasUpgrade("Elements",23))
                {
                    begin = player.Elements.points.add(1).ln().times(0.12).add(1)
                }
                if (!hasUpgrade("Elements",33))
                {
                    increase = time * 0.1
                }
                if (hasUpgrade("Elements",33))
                {
                    increase_multiple = player.Elements.points.pow(0.1)
                    if (increase_multiple < 1)
                    {
                        increase_multiple = 1
                    }
                    increase = time * 0.1 * increase_multiple
                }
                boost = increase + begin
                if (boost < 0.5)
                {
                    boost = 0.5
                }
                return boost
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
            title       : "EeU2-1A Initial speed",
            description :  function()
            {
                if(ctrlDown)
                {
                    return "<br>Can\'t be boosted"
                }
                return "<br>Atoms increase the initial speed<br><br>Currently: X" + format(this.effect())
            },
            cost        :  new Decimal(50),
            effect      :  function()
            {
                initial = player[this.layer].points.add(1).ln().times(0.1).add(1)
                return initial
            },
            unlocked    :  function()
            {
                return hasUpgrade("Elements",11)
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
            title       : "EeU2-1B Efficient operation",
            description :  function()
            {
                if(ctrlDown)
                {
                    return "<br>Can\'t be boosted"
                }
                return "<br>EeU1-1B is 25% more effective"
            },
            cost        :  new Decimal(50),
            unlocked    :  function()
            {
                return hasUpgrade("Elements",12)
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
            title       : "EeU2-1C Initial Speed",
            description :  function()
            {
                if(ctrlDown)
                {
                    return "<br>Can\'t be boosted"
                }
                return "<br>Atoms increase the initial speed<br><br>Currently: X" + format(this.effect())
            },
            cost        :  new Decimal(50),
            effect      :  function()
            {
                begin = player.Elements.points.add(1).ln().times(0.1).add(1)
                return begin
            },
            unlocked    :  function()
            {
                return hasUpgrade("Elements",13)
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
            title       : "EeU3-1A Reduce Resistance",
            description :  function()
            {
                if(ctrlDown)
                {
                    return "<br>Can\'t be boosted"
                }
                return "<br>Atoms decrease time resistance<br><br>Currently: X" + format(this.effect())
            },
            cost        :  new Decimal(50),
            effect      :  function()
            {
                reduce_multiple = player[this.layer].points.pow(0.1)
                reduce_multiple = 1 / reduce_multiple
                if (reduce_multiple > 1 || reduce_multiple < 0)
                {
                    reduce_multiple = 1
                }
                return reduce_multiple
            },
            unlocked    :  function()
            {
                return hasUpgrade("Elements",11)
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
            title       : "EeU3-1B Superload",
            description :  function()
            {
                if(ctrlDown)
                {
                    return "<br>Can\'t be boosted"
                }
                return "<br>PaU3-2 is 25% more effective"
            },
            cost        :  new Decimal(50),
            unlocked    :  function()
            {
                return hasUpgrade("Elements",12)
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
            title       : "EeU3-1C Continuous Work",
            description :  function()
            {
                if(ctrlDown)
                {
                    return "<br>Can\'t be boosted"
                }
                return "<br>Atoms increase the increase speed<br><br>Currently: X" + format(this.effect())
            },
            cost        :  new Decimal(50),
            effect      :  function()
            {
                increase_multiple = player.Elements.points.pow(0.2)
                if (increase_multiple < 1)
                {
                    increase_multiple = 1
                }
                return increase_multiple
            },
            unlocked    :  function()
            {
                return hasUpgrade("Elements",13)
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
            title       : "EeU4-1 Fuel Tank",
            description :  function()
            {
                if(ctrlDown)
                {
                    return "<br>X^0.6 → X^0.75"
                }
                return "<br>Atom boost use a better formula"
            },
            cost        :  new Decimal(100),
            unlocked    :  function()
            {
                return ((hasUpgrade("Elements",21) && hasUpgrade("Elements",31)) || (hasUpgrade("Elements",22) && hasUpgrade("Elements",32)) || (hasUpgrade("Elements",23) && hasUpgrade("Elements",33)))
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        42:
        {
            title       : "EeU4-2 Auto Fusion",
            description :  function()
            {
                if(ctrlDown)
                {
                    return "<br>Can\'t be boosted"
                }
                return "<br>Gain 1% of the Particles gain per second"
            },
            cost        :  new Decimal(500),
            unlocked    :  function()
            {
                return ((hasUpgrade("Elements",41) && hasUpgrade("Particles",33)) || hasUpgrade("Elements",42))
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        43:
        {
            title       : "EeU4-3 Component Protection",
            description :  function()
            {
                if(ctrlDown)
                {
                    return "<br>Unboostable"
                }
                return "Keep every Pa Upgrades on reset"
            },
            cost        :  function()
            {

                x = 2500
                return x
            },
            unlocked    :  function()
            {
                return (hasUpgrade("Elements",42))
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        51:
        {
            title       : "EeU5-1 Shell improvement",
            description : "Enable to buy another type of MK3",
            cost        :  new Decimal(1e10),
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
    },

    milestones :
    {
        0:
        {
            requirementDescription : "EeM1 - Elements Layer Unlocked",
            effectDescription      : "Atomes begins to boost production",
            done                   :  function()
            {
                return (player.Elements.points > 0)
            },
        },
        1:
        {
            requirementDescription : "EeM2 - EeU1-1A, EeU1-1B or EeU1-1C Bought",
            effectDescription      : "Generator MK3 save the mechanical components. Keep Pa1-1, Pa1-2 and Pa1-3 on reset.",
            done                   :  function()
            {
                return (hasUpgrade("Elements",11) || hasUpgrade("Elements",12) || hasUpgrade("Elements",13))
            }
        },
        2:
        {
            requirementDescription : "EeM3 - 200 Atoms in Total",
            effectDescription      : "Atoms begin to differentiate into elements. Unlock a new Buyable",
            done                   :  function()
            {
                return player[this.layer].best.gte(200)
            }
        },
        3:
        {
            requirementDescription : "EeM4 - 2 EeB1 bought(WIP)",
            effectDescription      : "Atoms begin to react with each other. Unlock a new layer.(WIP)",
            done                   :  function()
            {
                if (getBuyableAmount("Elements",11) > 1)
                {
                    return true
                }
                return false
            }
        }
    },

    buyables :
    {
        11:
        {
            title     : "EeB1 - Quantity of natural elements",
            display   :  function()
            {
                description = "\n<b><h3>Natural elements start to form\nEvery element will boost production for 1.1x</h3></b>\n"
                start       = "\n<b><h3>Amount: " + getBuyableAmount("Elements",11) + " Types</h3></b>"
                effect      = "\n<b><h3>Effect: X" + format(this.effect()) + "</h3></b>"
                cost        = "\n<b><h3>Cost: "   + format(this.cost()) + " Atoms</h3></b>"
                if (getBuyableAmount("Elements",11) > 94)
                {
                    cost        = "\n<b><h3>All natural elements has formed</h3></b>"
                }
                return description + start + effect + cost
            },
            cost      :  function()
            {
                if (getBuyableAmount("Elements",11) <= 94)
                {
                    x = getBuyableAmount("Elements",11).add(1).pow(2).times(50)
                    return x
                }
                x = new Decimal(Infinity)
                return x
            },
            effect    :  function()
            {
                return new Decimal(1.1).pow(getBuyableAmount("Elements",11))  
            },
            unlocked  :  function()
            {
                return (hasMilestone("Elements",2))
            },
            canAfford :  function()
            {
                return player[this.layer].points.gte(this.cost())
            },
            buy       :  function()
            {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer,11,getBuyableAmount(this.layer,11).add(1))
            }
        }
    },

    clickables :
    {
        11:
        {
            title    : "Discard Mk3 Components",
            display  :  function()
            {
                return "<br>Warning: Cleans ALL Elements upgrades, make sure that you have enough Atoms!"
            },
            unlocked :  function()
            {
                return (hasUpgrade("Elements",11) || hasUpgrade("Elements",12) || hasUpgrade("Elements",13))
            }, 
            canClick :  function()
            {
                return true
            },
            onClick  :  function()
            {
                milestoneKeep = []
                if (hasMilestone("Elements",0)) milestoneKeep.push(0)
                if (hasMilestone("Elements",2)) milestoneKeep.push(2)
                if (hasMilestone("Elements",3)) milestoneKeep.push(3)
                playerPoints = player.Elements.points
                buyableKeep  = player.Elements.buyables
                layerDataReset("Elements")
                player.Elements.milestones = milestoneKeep
                player.Elements.buyables   = buyableKeep
                player.Elements.points     = playerPoints
            },
            style    :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
    },
})