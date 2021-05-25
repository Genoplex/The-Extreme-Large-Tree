addLayer("Lifes",
{
    name         : "Lifes",
    symbol       : "L",
    resource     : "Evolve Points",
    baseResource : "Matters",
    color        : "#D0D0D0",
    type         : "normal",
    exponent     : 1,
    position     : 2,
    row          : 3,
    requires     : new Decimal(50),
    branches     : ["Substances","ExoticSubstances","MagicSubstances"],
    base         : 1000,

    resetDescription : "Merge Matter for ",

    tooltip :  function()
    {
        return "Layer: Lifes\n" + format(player.Lifes.points)
    },
    
    tabFormat:
    [
        "main-display",
        ["display-text",function(){return 'You have ' + format(player.Substances.points) + ' Matters'}],
        "blank",
        "buyables",
        "blank",
        ["row",[["upgrade",32],["upgrade",21],["upgrade",33]]],
        ["row",[["upgrade",31]]],
        ["row",[["upgrade",51],["upgrade",42],["upgrade",41],["upgrade",43],["upgrade",11]]],
        ["row",[["upgrade",71],["upgrade",61],["upgrade",11],["upgrade",11],["upgrade",11],["upgrade",11],["upgrade",11]]],
        ["row",[["upgrade",72],["upgrade",11],["upgrade",11],["upgrade",11],["upgrade",11]]],
        "blank",
        "milestones",
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
        return ((getClickableState("GreatFilters",11) == "Done") || player[this.layer].unlocked)
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
        return player.Substances.points
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
        rows:100,
        cols:100,
        11:
        {
            title       : "LX PlaceHolder",
            cost        :  new Decimal(Infinity),
            style       :  function()
            {
                return {
                    "opacity":  0,
                    "height" : "120px",
                    "width"  : "120px"
                }
            }
        },
        21:
        {
            title       : "L1 Life (CBNO)",
            description : "Carbon Based Normal Organisms",
            style       :  function()
            {
                return{
                    "margin-top": "0px",
                    "height" : "250px",
                    "width"  : "250px"
                }
            }
        },
        31:
        {
            title       : "L11 Eukaryote Domain",
            style       :  function()
            {
                return{
                    "margin-top": "0px",
                    "height" : "200px",
                    "width"  : "200px"
                }
            }
        },
        32:
        {
            title       : "L12 Bacteria Domain",
            style       :  function()
            {
                return{
                    "margin-bottom": "50px",
                    "height" : "200px",
                    "width"  : "200px"
                }
            }
        },
        33:
        {
            title       : "L13 Archaea Domain",
            style       :  function()
            {
                return{
                    "margin-bottom": "50px",
                    "height" : "200px",
                    "width"  : "200px"
                }
            }
        },
        41:
        {
            title :  "L111 Animal Kingdom",
            style       :  function()
            {
                return{
                    "height" : "120px",
                    "width"  : "120px"
                }
            }
        },
        42:
        {
            title :  "L112 Plant Kingdom",
            style       :  function()
            {
                return{
                    "height" : "120px",
                    "width"  : "120px"
                }
            }
        },
        43:
        {
            title :  "L113 Fungus Kingdom",
            style       :  function()
            {
                return{
                    "height" : "120px",
                    "width"  : "120px"
                }
            }
        },
        51:
        {
            title :  "L1121 Land Plants",
            style       :  function()
            {
                return{
                    "margin-bottom": "50px",
                    "height" : "120px",
                    "width"  : "120px"
                }
            }
        },
        61:
        {
            title :  "L11211 Vascular Plants",
            style       :  function()
            {
                return{
                    "height" : "120px",
                    "width"  : "120px"
                }
            }
        },
        71:
        {
            title :  "L112111 Gymnosperms",
            style       :  function()
            {
                return{
                    "height" : "120px",
                    "width"  : "120px"
                }
            }
        },
        72:
        {
            title :  "L112112 Angiosperms",
            style       :  function()
            {
                return{
                    "height" : "120px",
                    "width"  : "120px"
                }
            }
        }
    }
})