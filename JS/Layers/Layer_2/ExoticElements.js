addLayer("ExoticElements",
{
    name          : "ExoticElements",
    symbol        : "EE",
    resource      : "Strangelets",
    baseResource  : "Particles",
    baseAmount    :  function()
    {
        return player.Particles.points
    },
    color         : "#FFFFFF",
    type          : "normal",
    exponent      :  1,
    position      :  2,
    row           :  1,
    branches      : ["Particles"],

    requires     :  function()
    {
        {
            if (player.Elements.unlocked && player.Elemixs.unlocked)
            {
                return (new Decimal(1e200))
            }
            if (player.Elements.unlocked || player.Elemixs.unlocked)
            {
                return (new Decimal(1e100))
            }
            return (new Decimal(1000))
        }
    },

    resetDescription:"Transform Particles for ",

    hotkeys :
    [
        {
            key:"w",
            description : "Press → W ← for ExoticElements Reset",
            onPress :  function()
            {
                if (player.ExoticElements.unlocked)
                {
                    doReset("ExoticElements")
                }
            }
        }
    ],

    tooltip :  function()
    {
        return "Layer: ExoticElements\n" + format(player.ExoticElements.points) + " Strangelets"
    },

    tabFormat:
    {
        "Upgrades":
        {
            content:
            [
                "main-display",
                ["prestige-button","",function()
                    {
                        if((player.ExoticElements.Control > 0))
                        {
                            return {'display':'none'}
                        }
                    }
                ],
                "blank",
                ["display-text",function()
                    {
                        if(player.ExoticElements.Control > 0)
                        {
                            return "The prestige button will be hidden in some cases <br> to prevent photosensitive seizures<br>"
                        }
                    }
                ],
                ["display-text",function()
                    {
                        return 'You have ' + format(player.Particles.points) + ' Particles'
                    }
                ],
                "blank",
                ["display-text",function(){return '<h3>Tip:</h3> Strangelets transform and consume Particles'}],
                ["display-text",function(){return 'For every 1000 Particles transformed, you will get 1 Strangelet'}],
                ["display-text",function(){return 'The Price of upgrades reduces within the increase of stability'}],
                "blank",
                ['display-text',function()
                    {
                        return 'You have ' + format(player.ExoticElements.points) + ' Strangelets'
                    }
                ],
                ["display-text",function()
                    {
                        return format(Number(player.ExoticElements.Transformed).toFixed(0)) + " Particles have been transformed"
                    }
                ],
                ["display-text",function()
                    {
                        return format(player.ExoticElements.Safe) + " Particles are under protection "
                    }
                ],
                ["display-text",function()
                    {
                        return "The Price of upgrades have been reduced to " + format((1-player.ExoticElements.Percent)*100) + "% (100%-" + format(player.ExoticElements.Percent*100) + "%)"
                    }],
                ["display-text",function()
                    {
                        return format(100*(1 - Math.pow(player.ExoticElements.Percent,player.ExoticElements.points))) + "% Unprotected particles is transformed every TICK (100%-" + format(player.ExoticElements.Percent*100) + "%^" + format(player.ExoticElements.points) + ")"
                    }
                ],
                "blank",
                ["row",[["upgrade",31],["upgrade",11],["upgrade",32]]],
                ["row",[["upgrade",21]]],
                "blank",
                ["display-text",function()
                    {
                        return "<b>Important:</b> Wrong steps lead to bad situations!"
                    }
                ],
                "blank",
                ["clickable",11]
            ],
        },
        "Milestones":
        {
            unlocked :  function()
            {
                return (player.ExoticElements.unlocked)
            },
            content  :
            [
                "main-display",
                ["prestige-button","",function()
                    {
                        if(player.ExoticElements.Control > 0)
                        {
                            return {'display':'none'}
                        }
                    }
                ],
                "blank",
                ["display-text",function()
                    {
                        if(player.ExoticElements.Control > 0)
                        {
                            return "The prestige button will be hidden in some cases <br> to prevent photosensitive seizures<br>"
                        }
                    }
                ],
                ["display-text",function()
                    {
                        return 'You have ' + format(player.Particles.points) + ' Particles'
                    }
                ],
                "blank",
                ["display-text",function(){return '<h3>Tip:</h3> Strangelets transform and consume Particles'}],
                ["display-text",function(){return 'For every 1000 Particles transformed, you will get 1 Strangelet'}],
                ["display-text",function(){return 'The Price of upgrades reduces within the increase of stability'}],
                "blank",
                ['display-text',function()
                    {
                        return 'You have ' + format(player.ExoticElements.points) + ' Strangelets'
                    }
                ],
                ["display-text",function()
                    {
                        return format(Number(player.ExoticElements.Transformed).toFixed(0)) + " Particles have been transformed"
                    }
                ],
                ["display-text",function()
                    {
                        return format(player.ExoticElements.Safe) + " Particles are under protection "
                    }
                ],
                ["display-text",function()
                    {
                        return "The Price of upgrades have been reduced to " + format((1-player.ExoticElements.Percent)*100) + "% (100%-" + format(player.ExoticElements.Percent*100) + "%)"
                    }],
                ["display-text",function()
                    {
                        return format(100*(1 - Math.pow(player.ExoticElements.Percent,player.ExoticElements.points))) + "% Unprotected particles is transformed every TICK (100%-" + format(player.ExoticElements.Percent*100) + "%^" + format(player.ExoticElements.points) + ")"
                    }
                ],
                "blank",
                "milestones",
                "blank",
            ]
            
        },
        "Strange Space":
        {
            unlocked :  function()
            {
                return (player.ExoticElements.unlocked)
            },
            content:
            [
                "main-display",
                ["prestige-button","",function()
                    {
                        if(player.ExoticElements.Control > 0)
                        {
                            return {'display':'none'}
                        }
                    }
                ],
                "blank",
                ["display-text",function()
                    {
                        if(player.ExoticElements.Control > 0)
                        {
                            return "The prestige button will be hidden in some cases <br> to prevent photosensitive seizures<br>"
                        }
                    }
                ],
                ["display-text",function()
                    {
                        return 'You have ' + format(player.Particles.points) + ' Particles'
                    }
                ],
                "blank",
                ["display-text",function(){return '<h3>Tip:</h3> Strangelets transform and consume Particles'}],
                ["display-text",function(){return 'For every 1000 Particles transformed, you will get 1 Strangelet'}],
                ["display-text",function(){return 'The Price of upgrades reduces within the increase of stability'}],
                "blank",
                ['display-text',function()
                    {
                        return 'You have ' + format(player.ExoticElements.points) + ' Strangelets'
                    }
                ],
                ["display-text",function()
                    {
                        return format(Number(player.ExoticElements.Transformed).toFixed(0)) + " Particles have been transformed"
                    }
                ],
                ["display-text",function()
                    {
                        return format(player.ExoticElements.Safe) + " Particles are under protection "
                    }
                ],
                ["display-text",function()
                    {
                        return "The Price of upgrades have been reduced to " + format((1-player.ExoticElements.Percent)*100) + "% (100%-" + format(player.ExoticElements.Percent*100) + "%)"
                    }],
                ["display-text",function()
                    {
                        return format(100*(1 - Math.pow(player.ExoticElements.Percent,player.ExoticElements.points))) + "% Unprotected particles is transformed every TICK (100%-" + format(player.ExoticElements.Percent*100) + "%^" + format(player.ExoticElements.points) + ")"
                    }
                ],
                "blank",
                ["row",[["clickable",12],["upgrade",99],["clickable",13]]],
                "blank",
                ["display-text",function()
                    {
                        return format(player.ExoticElements.Safe) + " " + format(player.ExoticElements.Consumed) + " " + format(player.ExoticElements.Consume) + " " + format(player.ExoticElements.Consumed.add(-100).times(0.001).pow(0.833))
                    }
                ],
                ["display-text",function(){return format(player.ExoticElements.Stable) + " " + format(player.ExoticElements.StablePercent*100) + "% " + format(player.ExoticElements.Percent*100) + "% " + format(player.ExoticElements.ConsumeStable)}]
            ]
        }
    },

    layerShown :  function()
    {
        return ( player[this.layer].unlocked || ((hasUpgrade("Particles",33)) && ((!player.Elemixs.unlocked && !player.Elements.unlocked) || (player.Particles.points > 1e200 && player.Elemixs.unlocked && player.Elements.unlocked) || (player.Particles.points > 1e100 && (player.Elemixs.unlocked || player.Elements.unlocked)))))
    },

    startData()
    {    
        return{
        unlocked      : false,
		points        : new Decimal(0),
        Transformed   : new Decimal(0),
        Add           : new Decimal(0),
        Percent       : new Decimal(0),
        Safe          : 0,
        Consume       : 0,
        Consumed      : new Decimal(0),
        Stable        : new Decimal(0),
        StablePercent : 0,
        ConsumeStable : 0,
        Control       : 0,
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
        player.ExoticElements.Add      = 0
        player.ExoticElements.Safe     = 0
        player.ExoticElements.Percent  = 0
        if (typeof Transformed === "undefined")
        {
            Transform = 0
        }

        if (hasUpgrade("ExoticElements",11))
        {
            player.ExoticElements.Safe = 100
        }
        player.ExoticElements.Safe = player.ExoticElements.Consumed.add(-100).times(0.001).pow(0.833).add(100)
        player.ExoticElements.Consume = player.ExoticElements.Safe.add(184.19).pow(1.1).times(2)
        if(player.ExoticElements.Consume < 1000)
        {
            player.ExoticElements.Consume = 1000
        }

        player.ExoticElements.ConsumeStable = player.ExoticElements.Stable.pow(0.05)
        if(player.ExoticElements.ConsumeStable < 0.02)
        {
            player.ExoticElements.ConsumeStable = 0.02
        }

        if(player.ExoticElements.Stable < 10000)
        {
            player.ExoticElements.Percent = player.ExoticElements.Stable.times(0.00009)
        }
        if(player.ExoticElements.Stable > 10000)
        {
            player.ExoticElements.StablePercent = player.ExoticElements.Stable.add(1).pow(0.25)
            StablePercent = -1/player.ExoticElements.StablePercent
            player.ExoticElements.StablePercent = StablePercent
            player.ExoticElements.StablePercent = new Decimal(player.ExoticElements.StablePercent + 1)
            player.ExoticElements.Percent = player.ExoticElements.StablePercent.add(player.ExoticElements.Percent)
        }

        if (player[this.layer].unlocked && (player.Particles.points > player.ExoticElements.Safe))
        {
            Transform                                  = (player.Particles.points-player.ExoticElements.Safe)*(1 - Math.pow(player.ExoticElements.Percent,player.ExoticElements.points))
            if(Transform <= 0)
            {
                Transform = 0
            }
            player.ExoticElements.Transformed          = player.ExoticElements.Transformed.add(Transform)
            Transform                                  = -Transform
            player.Particles.points                    = player.Particles.points.add(Transform)
            if (player.ExoticElements.Transformed >= 1)
            {
                Transformed                            = player.ExoticElements.Transformed
                Add                                    = Transformed % 1000
                Add                                    = (Transformed - Add)/1000
                player.ExoticElements.Add              = Add
                if (player.ExoticElements.Add > 0)
                {
                    player.ExoticElements.points       = player.ExoticElements.points.add(player.ExoticElements.Add)
                    Add                                = player.ExoticElements.Add
                    Add                                = Add * -1000
                    player.ExoticElements.Add          = Add
                    player.ExoticElements.Transformed  = player.ExoticElements.Transformed.add(player.ExoticElements.Add)
                }
            }
        }

        if(getClickableState("ExoticElements",12) == "Producting")
        {
            if(player.points > player.ExoticElements.Consume)
            {
                player.points = player.points.add(-player.ExoticElements.Consume)
                player.ExoticElements.Consumed = player.ExoticElements.Consumed.add(player.ExoticElements.Consume)
            }
            if(player.points < player.ExoticElements.Consume)
            {
                player.ExoticElements.Consumed = player.ExoticElements.Consumed.add(player.points)
                player.points = new Decimal(0)
            }
        }

        if(getClickableState("ExoticElements",13) == "Producting")
        {
            if(player.ExoticElements.points > player.ExoticElements.ConsumeStable)
            {
                player.ExoticElements.points = player.ExoticElements.points.add(-player.ExoticElements.ConsumeStable)
                player.ExoticElements.Stable = player.ExoticElements.Stable.add(player.ExoticElements.ConsumeStable)
            }
            if(player.ExoticElements.points < player.ExoticElements.ConsumeStable)
            {
                player.ExoticElements.Stable = player.ExoticElements.Stable.add(player.ExoticElements.points)
                player.ExoticElements.points = new Decimal(0)
            }
        }

        if((player.Particles.points-player.ExoticElements.Safe)*(1 - Math.pow(player.ExoticElements.Percent,player.ExoticElements.points)) > 200)
        {
            player.ExoticElements.Control = 5
        }
        player.ExoticElements.Control = player.ExoticElements.Control - 1
    },

    doReset()
    {

    },

    upgrades:
    {
        11:
        {
            title       : "EEU1 Enclosed Space",
            description :  function()
            {
                if(ctrlDown)
                {
                    return '<br>Unboostable'
                }
                return "<br>Protect 100 Particles and your generator"
            },
            cost        :  new Decimal(1),
            style    :  function()
            {
                return{
                    "height" : "150px",
                }
            }
        },
        21:
        {
            title       : "EEU2 Strangelet Excitation",
            description :  function()
            {
                if(ctrlDown)
                {
                    return "<br>Unboostable"
                }
                return "<br>Gain 1% of the Particles gain per second"
            },
            cost        :  function()
            { 
                x = 200*(1-player.ExoticElements.Percent)
                return new Decimal(x)
            },
            unlocked    :  function()
            {
                return hasUpgrade("ExoticElements",11)
            },
            style       :  function()
            {
                return{
                    "height" : "150px"
                }
            }
        },
        31:
        {
            title       : "EEU3-1 Multi component I",
            description :  function()
            {
                if(ctrlDown)
                {
                    return "<br>Unboostable"
                }
                return "<br>Gain energy during expanding and stabling"
            },
            cost        :  function()
            {
                x = 5000*(1-player.ExoticElements.Percent)
                return new Decimal(x)
            },
            unlocked    :  function()
            {
                return hasUpgrade("ExoticElements",21)
            },
            style       :  function()
            {
                return{
                    "height" : "150px"
                }
            }
        },
        32:
        {
            title       : "EEU3-1 Multi component II",
            description :  function()
            {
                if(ctrlDown)
                {
                    return "<br>Unboostable"
                }
                return "<br>Gain Particles during expanding and stabling"
            },
            cost        :  function()
            {
                x = 5000*(1-player.ExoticElements.Percent)
                return new Decimal(x)
            },
            unlocked    :  function()
            {
                return hasUpgrade("ExoticElements",21)
            },
            style       :  function()
            {
                return{
                    "height" : "150px"
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
                    "width"   : "20px", 
                    "opacity" :  0
                }
            }
        }

    },

    clickables:
    {
        11:
        {
            title    : "Solve the Dilemma",
            display  :  function()
            {
                return "<br>This will appear when you can\'t gain any energy. Warning: Reset Particles and Strangelets!"
            },
            unlocked :  function()
            {
                return ((player.points == 0) && (player.Particles.points < 1))
            },
            canClick :  function()
            {
                return true
            },
            onClick  :  function()
            {
                layerDataReset("ExoticElements")
                layerDataReset("Particles")
                player.points = player.points.add(15)
            },
            style    :  function()
            {
                return{
                    "height" : "150px"
                }
            }
        },
        12:
        {
            title    : "EEC1 Isolated Space Expansion",
            display  :  function()
            {
                Description = "<br>Consume energy expanding the space saving your particles\nStops the production of energy and particles and the consume speed increase within isolated space expansion"
                Space = ""
                Consumed = ""
                Consume = ""
                if(ctrlDown)
                {
                    Description = ""
                    Space = "<br>Space: " + format(player.ExoticElements.Safe) + " particles"
                    Consumed = "<br>Consumed: " + format(player.ExoticElements.Consumed) + " energy"
                    Consume = "<br>Will consume: " + format(player.ExoticElements.Consume) + " energy/s"
                }
                State = ""
                if(getClickableState("ExoticElements",12)=="Producting")
                {
                    State = "<br><br><b>Space expanding!</b>"
                }
                if(getClickableState("ExoticElements",13)=="Producting")
                {
                    State = "<br><br><b>Strangelet Stabling! →</b>"
                }
                return Description + Space + Consumed + Consume + State
            },
            unlocked :  function()
            {
                return player.ExoticElements.unlocked
            },
            canClick :  function()
            {
                return (getClickableState("ExoticElements",13)!=="Producting")
            },
            onClick  :  function()
            {
                switch(getClickableState("ExoticElements",12))
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
                    "height" : "200px",
                    "width"  : "200px"
                }
            }
        },
        13:
        {
            title    : "EEC2 Strangelet Stability",
            display  :  function()
            {
                Description = "<br>Consume strangelets researching the stability of strangelets\nStops the production of energy and particles and the consume speed increase within the stable of strangelets"
                Percent = ""
                Consumed = ""
                Consume = ""
                if(ctrlDown)
                {
                    Description = ""
                    Percent = "<br>Percent: " + format(player.ExoticElements.Percent*100) + "%"
                    Consumed = "<br>Consumed: " + format(player.ExoticElements.Stable) + " strangelets"
                    Consume = "<br>Will consume: " + format(player.ExoticElements.ConsumeStable) + " strangelets/s"
                }
                State = ""
                if(getClickableState("ExoticElements",12)=="Producting")
                {
                    State = "<br><br><b>← Space expanding!</b>"
                }
                if(getClickableState("ExoticElements",13)=="Producting")
                {
                    State = "<br><br><b>Strangelet Stabling!</b>"
                }
                return Description + Percent + Consumed + Consume + State
            },
            unlocked :  function()
            {
                return player.ExoticElements.unlocked
            },
            canClick :  function()
            {
                return (getClickableState("ExoticElements",12)!=="Producting")
            },
            onClick  :  function()
            {
                switch(getClickableState("ExoticElements",13))
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
                    "height" : "200px",
                    "width"  : "200px"
                }
            }
        }
    },

    milestones:
    {
        0:
        {
            requirementDescription : "EEM1 - ExoticElements Layer Unlocked",
            effectDescription      : "Strangelets begins to reduce production",
            done                   :  function()
            {
                return (player.ExoticElements.points >= 1)
            }
        },
        1:
        {
            requirementDescription : "EEM2 - EEU2 bought",
            effectDescription      : "Now it is possible to use strangelets for automation. Gain 1% of the Particles gain per second",
            done : function()
            {
                return hasUpgrade("ExoticElements",21)
            }
        },
        2:
        {
            requirementDescription : "EEM3 - Reach 90% Stability(WIP)",
            effectDescription      : "Strangelets start to be stable and gradually differentiate into different substances. Unlock a new layer(WIP)",
            done : function()
            {
                return false
            }
        },
    }
})