addLayer("Elements",
{
    name         : "Elements",
    symbol       : "E",
    resource     : "Atoms",
    baseResource : "Particles",
    color        : "#F8FFB8",
    type         : "normal",
    exponent     : 1,
    position     : 1,
    row          : 1,
    requires     : new Decimal(1000),
    branches     : ["Particles"],
    base         : 1000,

    resetDescription : "Merge Particles for ",

    tabFormat:
    [
        "main-display",
        "prestige-button",
        "blank",
        ["display-text",function(){return 'You have ' + format(player.Particles.points) + ' Particles'}],
        "blank",
        ["display-text",function(){return 'You have ' + format(player.Elements.points) + ' Atoms and they boost production by ' + format(tmp["Elements"].effect.atom_multiple) + "x" }],
        "blank",
        "buyables",
        "blank",
        "upgrades",
        "blank",
        "milestones",
        "blank",
    ],


    doReset(resettingLayer)
    {
        player.resetTime = 0
        if (resettingLayer == "Matters")
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

    canBuyMax    : function()
    {
        return true
    },

    layerShown()
    {
        return (hasUpgrade("Particles",33) || player[this.layer].unlocked)
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
        atom_multiple = player.Elements.points
        if (!(hasUpgrade("Elements",41)))
        {
            atom_multiple = atom_multiple.pow(0.75).add(1)
        }
        if (hasUpgrade("Elements",41))
        {
            atom_multiple = atom_multiple.pow(0.95).add(1)
        }
        buyable11_multiple = new Decimal(1.1).pow(getBuyableAmount("Elements",11))
        main_multiple = atom_multiple * buyable11_multiple
        return {atom_multiple, buyable11_multiple, main_multiple}
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
        player.resetTime += 0.05
    },

    milestones:
    {
        0:
        {
            requirementDescription : "EM1 - Elements Layer Unlocked",
            effectDescription      : "Atoms begin to boost production",
            done                   :  function()
            {
                return true
            }
        },
        1:
        {
            requirementDescription : "EM2 - E1-1A, E1-1B or E1-1C Bought",
            effectDescription      : "Generator MK3 save the mechanical components. Keep P1-1, P1-2 and P1-3 on reset.",
            done                   :  function()
            {
                return (hasUpgrade("Elements",11) || hasUpgrade("Elements",12) || hasUpgrade("Elements",13))
            }
        },
        2:
        {
            requirementDescription : "EM3 - 100 Atoms in Total",
            effectDescription      : "Atoms begin to differentiate into elements. Unlock a new Buyable",
            done                   :  function()
            {
                return player[this.layer].best.gte(100)
            }
        },
        3:
        {
            requirementDescription : "EM4 - 1 EB1 bought",
            effectDescription      : "Atoms begin to react with each other. Unlock a new layer",
            done                   :  function()
            {
                if(getBuyableAmount("Elements",11) > 0)
                {
                    return true
                }
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
            title : "EB1 - Quantity of natural elements",
            display()
            {
                let description = "\n<b><h3>Natural elements start to form\nEvery element will boost production for 1.1x</h3></b>\n"
                let start       = "\n<b><h3>Amount: " + getBuyableAmount("Elements",11) + " Types</h3></b>"
                let effect      = "\n<b><h3>Effect: " + format(this.effect()) + "</h3></b>"
                let cost        = "\n<b><h3>Cost: "   + format(this.cost()) + " Atoms</h3></b>"
                return description + start + effect + cost
            },
            cost()
            {
                if(getBuyableAmount("Elements",11) < 95)
                {
                    x = getBuyableAmount("Elements",11).add(1).pow(1.5).times(500)
                }
                if(getBuyableAmount("Elements",11) > 95)
                {
                    x= new Decimal(Infinity)
                }
                return x
            },
            effect()
            {
                return new Decimal(1.1).pow(getBuyableAmount("Elements",11))  
            },
            unlocked : function()
            {
                return hasMilestone("Elements",2)
            },
            canAfford()
            {
                return player[this.layer].points.gte(this.cost())
            },
            buy()
            {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer,11,getBuyableAmount(this.layer,11).add(1))
            }
        }
    },

    upgrades:
    {
        rows:5,
        cols:5,
        11:
        {
            title       : "E1-1A Generator MK3-Speed",
            description : "Time resistance. Locks B and C",
            cost()
            {
                if((hasUpgrade("Elements",12) && !(hasUpgrade("Elements",51))) || (hasUpgrade("Elements",13) && !(hasUpgrade("Elements",51)) || (hasUpgrade("Elements",12) && hasUpgrade("Elements",13) && hasUpgrade("Elements",51))))
                {
                    return Infinity
                }
                return 5
            },
            effect      :  function()
            {
                time = player.resetTime
                if (!(hasUpgrade("Elements",21)))
                {
                    initial = 100
                }
                if (hasUpgrade("Elements",21))
                {
                    initial = player[this.layer].points.add(1).ln().times(0.1).add(1).times(100)
                }
                if (!hasUpgrade("Elements",31))
                {
                    reduce = time * 2
                }
                if (hasUpgrade("Elements",31))
                {
                    reduce_multiple = player[this.layer].points.pow(0.1)
                    reduce_multiple = 1 / reduce_multiple
                    if(reduce_multiple > 1 || reduce_multiple < 0)
                    {
                        reduce_multiple = 1
                    }
                    reduce = time * 2 * reduce_multiple
                }
                value = initial - reduce
                if(value < 0.5)
                {
                    value = 0.5
                }
                return value
            }
        },
        12:
        {
            title       : "E1-1B Generator MK3-Normal",
            description : "Stable working. Locks A and C",
            cost()
            {
                if((hasUpgrade("Elements",11) && !(hasUpgrade("Elements",51))) || (hasUpgrade("Elements",13) && !(hasUpgrade("Elements",51)) || (hasUpgrade("Elements",11) && hasUpgrade("Elements",13) && hasUpgrade("Elements",51))))
                {
                    return Infinity
                }
                return 5
            },
            effect      :  function()
            {
                if (hasUpgrade("Elements",22))
                {
                    return 50
                }
                if (!(hasUpgrade("Elements",22)))
                {
                    return 33.33
                }
            }
        },
        13:
        {
            title       : "E1-1C Generator MK3-Time",
            description : "Time conductance. Locks A and B",
            cost()
            {
                if((hasUpgrade("Elements",11) && !(hasUpgrade("Elements",51))) || (hasUpgrade("Elements",12) && !(hasUpgrade("Elements",51)) || (hasUpgrade("Elements",11) && hasUpgrade("Elements",12) && hasUpgrade("Elements",51))))
                {
                    return Infinity
                }
                return 5 
            },
            effect      :  function()
            {
                time = player.resetTime
                if (!(hasUpgrade("Elements",23)))
                {
                    begin = 1
                }
                if (hasUpgrade("Elements",23))
                {
                    begin = player[this.layer].points.add(1).ln().times(0.12).add(1)
                }
                if (!hasUpgrade("Elements",33))
                {
                    increase = time * 0.1
                }
                if (hasUpgrade("Elements",33))
                {
                    increase_multiple = player[this.layer].points.pow(0.1)
                    if(increase_multiple < 1)
                    {
                        increase_multiple = 1
                    }
                    increase = time * 0.1 * increase_multiple
                }
                boost = increase + begin
                if(boost < 0.5)
                {
                    boost = 0.5
                }
                return boost
            }
        },
        21:
        {
            title       : "E2-1A Initial speed",
            description : "Atoms increase the initial speed",
            cost        :  new Decimal(50),
            effect      :  function()
            {
                initial = player[this.layer].points.add(1).ln().times(0.1).add(1)
                return initial
            },
            unlocked    :  function()
            {
                return hasUpgrade("Elements",11)
            }
        },
        22:
        {
            title       : "E2-1B Efficient operation",
            description : "E1-1B is 25% more effective",
            cost        :  new Decimal(50),
            unlocked    :  function()
            {
                return hasUpgrade("Elements",12)
            }
        },
        23:
        {
            title       : "E2-1C ",
            description : "Atoms increase conduction",
            cost        :  new Decimal(50),
            effect      :  function()
            {
                begin = player[this.layer].points.add(1).ln().times(0.1).add(1)
                return begin
            },
            unlocked    :  function()
            {
                return hasUpgrade("Elements",13)
            }
        },
        31:
        {
            title       : "E3-1A Reduce Resistance",
            description : "Atoms decrease time resistance",
            cost        :  new Decimal(50),
            effect      :  function()
            {
                reduce_multiple = player[this.layer].points.pow(0.1)
                reduce_multiple = 1 / reduce_multiple
                if(reduce_multiple > 1 || reduce_multiple < 0)
                {
                    reduce_multiple = 1
                }
                return reduce_multiple
            },
            unlocked    :  function()
            {
                return hasUpgrade("Elements",11)
            }
        },
        32:
        {
            title       : "E3-1B Superload",
            description : "P3-2 is 25% more effective",
            cost        :  new Decimal(50),
            unlocked    :  function()
            {
                return hasUpgrade("Elements",12)
            }
        },
        33:
        {
            title       : "E3-1C Initial Speed",
            description : "Atoms increase the initial speed",
            cost        :  new Decimal(50),
            effect      :  function()
            {
                increase_multiple = player[this.layer].points.pow(0.2)
                if(increase_multiple < 1)
                {
                    increase_multiple = 1
                }
                return increase_multiple
            },
            unlocked    :  function()
            {
                return hasUpgrade("Elements",13)
            }
        },
        41:
        {
            title       : "E4-1 Fuel Tank",
            description : "Atom boost use a better formula",
            cost        :  new Decimal(100),
            unlocked    :  function()
            {
                return ((hasUpgrade("Elements",21) && hasUpgrade("Elements",31)) || (hasUpgrade("Elements",22) && hasUpgrade("Elements",32)) || (hasUpgrade("Elements",23) && hasUpgrade("Elements",33)))
            }
        },
        42:
        {
            title       : "E4-2 Auto Fusion",
            description : "Gain 1% of the Particles gain per second",
            cost        :  new Decimal(1000),
            unlocked    :  function()
            {
                return ((hasUpgrade("Elements",41) && hasUpgrade("Particles",33)) || hasUpgrade("Elements",42))
            }
        },
        43:
        {
            title       : "E4-3 Component Protection",
            description : "Keep every P Upgrades on reset",
            cost        :  new Decimal(5000),
            unlocked    :  function()
            {
                return (hasUpgrade("Elements",42))
            }
        },
        51:
        {
            title       : "E5-1 Shell improvement",
            description : "Enable to buy another type of MK3",
            cost        :  new Decimal(1e10),
            unlocked    :  function()
            {
                return(hasUpgrade("Elements",11) || hasUpgrade("Elements",12) || hasUpgrade("Elements",13))
            }
        }
    }
})