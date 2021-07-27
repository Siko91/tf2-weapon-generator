const powerLevelSelect = document.getElementById("powerLevelSelect");
const playerClassSelect = document.getElementById("playerClassSelect");
const weaponSlotSelect = document.getElementById("weaponSlotSelect");
const generateBtn = document.getElementById("generateBtn");
const generatedWeaponArea = document.getElementById("generatedWeaponArea");

const strings = {
  classes: [
    "Any",
    "Scout",
    "Soldier",
    "Pyro",
    "Demoman",
    "Heavy",
    "Engineer",
    "Medic",
    "Sniper",
    "Spy",
  ],
  slots: ["Any", "Primary", "Secondary", "Melee"],
};

const weaponTypes = {
  // Burst Bullets
  Scattergun: { name: "Scattergun" },
  Shotgun: { name: "Shotgun" },
  // Single Bullet
  Spy_Revolver: { name: "Spy_Revolver" },
  Sniper_Rifle: { name: "Sniper_Rifle" },
  // Continuous Bullets
  Minigun: { name: "Minigun" },
  Pistol: { name: "Pistol" },
  Submachine_Gun: { name: "Submachine_Gun" },
  // Continuous Short Ranged
  Flamethrower: { name: "Flamethrower" },
  // Projectile
  Bow_and_Arrows: { name: "Bow_and_Arrows" },
  Flare_Gun: { name: "Flare_Gun", needsBoost: 2 },
  // Continuous Projectiles
  Syringe_Gun: { name: "Syringe_Gun" },
  // Consumable Projectile
  Throwable_AoE: { name: "Throwable_AoE" },
  Throwable_Weapon: { name: "Throwable_Weapon" },
  // Explosive Projectile
  Rocket_Launcher: { name: "Rocket_Launcher" },
  Pipe_Launcher: { name: "Pipe_Launcher" },
  Sticky_Launcher: { name: "Sticky_Launcher" },
  // Medigun with Uber
  Medi_Gun: { name: "Medi_Gun" },
  // Sapper
  Sapper: { name: "Sapper" },
  // Consumable Passive
  Drink_Can: { name: "Drink_Can" },
  Heavy_Food: { name: "Heavy_Food" },
  // Chargeable Passive
  Demoknight_Shield: { name: "Demoknight_Shield", needsBoost: 2 },
  Banner: { name: "Banner" },
  Invis_Watch: { name: "Invis_Watch" },
  // Passive
  Sniper_Shield: { name: "Sniper_Shield", needsBoost: 2 },
  Backpack: { name: "Backpack", needsBoost: 2 },
  Shoes: { name: "Shoes", needsBoost: 2 },
  Demoknight_Booties: { name: "Demoknight_Booties", needsBoost: 4 },
  // Melee
  Melee: { name: "Melee" },
  Demoknight_Melee: { name: "Demoknight_Melee" },
  Explosive_Melee: { name: "Explosive_Melee" },
  Medic_Melee: { name: "Medic_Melee" },
  Pybro_Melee: { name: "Pybro_Melee" },
  Melee_with_Projectile: { name: "Melee_with_Projectile" },
  Wrench_Melee: { name: "Wrench_Melee" },
  Backstabbing_Melee: { name: "Backstabbing_Melee" },
};

const weaponTypesByClass = [
  [
    // Scout
    { slot: 1, type: weaponTypes.Scattergun },
    { slot: 2, type: weaponTypes.Pistol },
    { slot: 2, type: weaponTypes.Throwable_Weapon },
    { slot: 2, type: weaponTypes.Throwable_AoE },
    { slot: 2, type: weaponTypes.Drink_Can },
    { slot: 2, type: weaponTypes.Backpack },
    { slot: 3, type: weaponTypes.Melee },
    { slot: 3, type: weaponTypes.Melee_with_Projectile },
  ],
  [
    // Soldier
    { slot: 1, type: weaponTypes.Rocket_Launcher },
    { slot: 1, type: weaponTypes.Shotgun },
    { slot: 2, type: weaponTypes.Banner },
    { slot: 2, type: weaponTypes.Backpack },
    { slot: 2, type: weaponTypes.Shoes },
    { slot: 3, type: weaponTypes.Melee },
    { slot: 3, type: weaponTypes.Explosive_Melee },
  ],
  [
    // Pyro
    { slot: 1, type: weaponTypes.Flamethrower },
    { slot: 1, type: weaponTypes.Shotgun },
    { slot: 1, type: weaponTypes.Flare_Gun },
    { slot: 2, type: weaponTypes.Backpack },
    { slot: 2, type: weaponTypes.Shoes },
    { slot: 2, type: weaponTypes.Throwable_AoE },
    { slot: 3, type: weaponTypes.Melee },
    { slot: 3, type: weaponTypes.Pybro_Melee },
  ],
  [
    // Demoman
    { slot: 1, type: weaponTypes.Pipe_Launcher },
    { slot: 1, type: weaponTypes.Demoknight_Booties },
    { slot: 1, type: weaponTypes.Shoes },
    { slot: 1, type: weaponTypes.Backpack },
    { slot: 2, type: weaponTypes.Shoes },
    { slot: 2, type: weaponTypes.Backpack },
    { slot: 2, type: weaponTypes.Sticky_Launcher },
    { slot: 2, type: weaponTypes.Demoknight_Shield },
    { slot: 3, type: weaponTypes.Melee },
    { slot: 3, type: weaponTypes.Demoknight_Melee },
    { slot: 3, type: weaponTypes.Explosive_Melee },
  ],
  [
    // Heavy
    { slot: 1, type: weaponTypes.Minigun },
    { slot: 2, type: weaponTypes.Shotgun },
    { slot: 2, type: weaponTypes.Backpack },
    { slot: 2, type: weaponTypes.Heavy_Food },
    { slot: 3, type: weaponTypes.Melee },
  ],
  // Engineer
  [
    { slot: 1, type: weaponTypes.Shotgun },
    { slot: 2, type: weaponTypes.Pistol },
    { slot: 2, type: weaponTypes.Backpack },
    { slot: 2, type: weaponTypes.Shoes },
    { slot: 3, type: weaponTypes.Wrench_Melee },
  ],
  [
    // Medic
    { slot: 1, type: weaponTypes.Syringe_Gun },
    { slot: 1, type: weaponTypes.Backpack },
    { slot: 1, type: weaponTypes.Shoes },
    { slot: 2, type: weaponTypes.Medi_Gun },
    { slot: 3, type: weaponTypes.Melee },
    { slot: 3, type: weaponTypes.Medic_Melee },
  ],
  [
    // Sniper
    { slot: 1, type: weaponTypes.Sniper_Rifle },
    { slot: 1, type: weaponTypes.Bow_and_Arrows },
    { slot: 2, type: weaponTypes.Submachine_Gun },
    { slot: 2, type: weaponTypes.Throwable_AoE },
    { slot: 2, type: weaponTypes.Throwable_Weapon },
    { slot: 2, type: weaponTypes.Sniper_Shield },
    { slot: 2, type: weaponTypes.Backpack },
    { slot: 3, type: weaponTypes.Melee },
    { slot: 3, type: weaponTypes.Melee_with_Projectile },
  ],
  [
    // Spy
    { slot: 1, type: weaponTypes.Spy_Revolver },
    { slot: 2, type: weaponTypes.Sapper },
    { slot: 2, type: weaponTypes.Invis_Watch },
    { slot: 3, type: weaponTypes.Backstabbing_Melee },
  ],
];

const weaponTypeGroups = {
  // BASIC GROUPS //
  BurstBullet: ["Scattergun", "Shotgun"],
  SingleBullet: ["Sniper_Rifle"],
  SemiAutomaticBullet: ["Spy_Revolver", "Pistol"],
  AutomaticBullet: ["Minigun", "Submachine_Gun"],
  Flamethrower: ["Flamethrower"],
  SingleShotProjectile: ["Bow_and_Arrows", "Flare_Gun"],
  AutomaticProjectiles: ["Syringe_Gun"],
  ConsumableProjectile: ["Throwable_AoE", "Throwable_Weapon"],
  ExplosiveProjectile: ["Rocket_Launcher", "Pipe_Launcher", "Sticky_Launcher"],
  Medi_Gun: ["Medi_Gun"],
  Sapper: ["Sapper"],
  ConsumablePassive: ["Drink_Can", "Heavy_Food"],
  ChargeablePassive: ["Demoknight_Shield", "Banner", "Invis_Watch"],
  Passive: ["Sniper_Shield", "Backpack", "Shoes", "Demoknight_Booties"],
  Melee: [
    "Melee",
    "Demoknight_Melee",
    "Explosive_Melee",
    "Medic_Melee",
    "Pybro_Melee",
    "Melee_with_Projectile",
    "Wrench_Melee",
    "Backstabbing_Melee",
  ],
};

// ABSTRACT GROUPS //
weaponTypeGroups.AllBullet = [
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SemiAutomaticBullet,
  ...weaponTypeGroups.AutomaticBullet,
];
weaponTypeGroups.AllExplosive = [
  ...weaponTypeGroups.ExplosiveProjectile,
  "Explosive_Melee",
];
weaponTypeGroups.AllReflectableDamageProjectile = [
  "Bow_and_Arrows",
  "Throwable_Weapon",
  "Rocket_Launcher",
  "Pipe_Launcher",
  "Melee_with_Projectile",
];
weaponTypeGroups.AllProjectile = [
  ...weaponTypeGroups.SingleShotProjectile,
  ...weaponTypeGroups.AutomaticProjectiles,
  ...weaponTypeGroups.ConsumableProjectile,
  ...weaponTypeGroups.ExplosiveProjectile,
  "Melee_with_Projectile",
];
weaponTypeGroups.AllReloading = [
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SemiAutomaticBullet,
  "Submachine_Gun",
  ...weaponTypeGroups.AutomaticProjectiles,
  ...weaponTypeGroups.ExplosiveProjectile,
];
weaponTypeGroups.AllHasClip = [
  ...weaponTypeGroups.SemiAutomaticBullet,
  "Submachine_Gun",
  "Syringe_Gun",
  ...weaponTypeGroups.ExplosiveProjectile,
];
weaponTypeGroups.AllWithAmmo = [
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SemiAutomaticBullet,
  ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.Flamethrower,
  ...weaponTypeGroups.SingleShotProjectile,
  ...weaponTypeGroups.AutomaticProjectiles,
];
weaponTypeGroups.AllAutomatic = [
  ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.Flamethrower,
  ...weaponTypeGroups.AutomaticProjectiles,
];
weaponTypeGroups.AllPassive = [
  ...weaponTypeGroups.ConsumablePassive,
  ...weaponTypeGroups.ChargeablePassive,
  ...weaponTypeGroups.Passive,
];
weaponTypeGroups.AllCanHit = [
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SemiAutomaticBullet,
  ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.Flamethrower,
  ...weaponTypeGroups.SingleShotProjectile,
  ...weaponTypeGroups.AutomaticProjectiles,
  ...weaponTypeGroups.ConsumableProjectile,
  ...weaponTypeGroups.ExplosiveProjectile,
  ...weaponTypeGroups.Melee,
];
weaponTypeGroups.AllDoesDamage = [
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SemiAutomaticBullet,
  ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.Flamethrower,
  ...weaponTypeGroups.SingleShotProjectile,
  ...weaponTypeGroups.AutomaticProjectiles,
  ...weaponTypeGroups.ExplosiveProjectile,
  ...weaponTypeGroups.Melee,
];
weaponTypeGroups.AllAfterburn = ["Flamethrower", "Flare_Gun"];
weaponTypeGroups.All = [
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SemiAutomaticBullet,
  ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.Flamethrower,
  ...weaponTypeGroups.SingleShotProjectile,
  ...weaponTypeGroups.AutomaticProjectiles,
  ...weaponTypeGroups.ConsumableProjectile,
  ...weaponTypeGroups.ExplosiveProjectile,
  ...weaponTypeGroups.Medi_Gun,
  ...weaponTypeGroups.Sapper,
  ...weaponTypeGroups.ConsumablePassive,
  ...weaponTypeGroups.ChargeablePassive,
  ...weaponTypeGroups.Passive,
  ...weaponTypeGroups.Melee,
];
weaponTypeGroups.AllDemoknight = [
  "Demoknight_Shield",
  "Demoknight_Booties",
  "Demoknight_Melee",
];

weaponTypeGroups.AllScout = weaponTypesByClass[0].map((w) => w.type.name);
weaponTypeGroups.AllSoldier = weaponTypesByClass[1].map((w) => w.type.name);
weaponTypeGroups.AllPyro = weaponTypesByClass[2].map((w) => w.type.name);
weaponTypeGroups.AllDemoman = weaponTypesByClass[3].map((w) => w.type.name);
weaponTypeGroups.AllHeavy = weaponTypesByClass[4].map((w) => w.type.name);
weaponTypeGroups.AllEngineer = weaponTypesByClass[5].map((w) => w.type.name);
weaponTypeGroups.AllMedic = weaponTypesByClass[6].map((w) => w.type.name);
weaponTypeGroups.AllSniper = weaponTypesByClass[7].map((w) => w.type.name);
weaponTypeGroups.AllSpy = weaponTypesByClass[8].map((w) => w.type.name);

const mandatoryPros = {
  Flare_Gun: [
    { pointCost: 0, text: "100% mini-crits vs burning players" },
    { pointCost: -1, text: "On Hit: Makes enemy wet and slows them down" },
    { pointCost: 0, text: "100% mini-crits vs wet players" },
  ],
  Throwable_AoE: [
    {
      pointCost: 0,
      text: "On Hit: Covered teammates receive temporary 20% damage resistance",
    },
    {
      pointCost: 0,
      text: "On Hit: Covered enemies cannot swap weapons for a few seconds",
    },
    {
      pointCost: 0,
      text: "On Hit: Covered engineer buildings get disabled for 5 seconds",
    },
    {
      pointCost: 0,
      text: "On Hit: Covered enemies reload time is doubled for 10 seconds",
    },
    {
      pointCost: 0,
      text: "On Hit: Covered enemies can be seen through walls by your teammates for 4 seconds",
    },
    {
      pointCost: 0,
      text: "On Hit: Covered enemies cannot attack for 2 seconds",
    },
  ],
  Throwable_Weapon: [
    {
      pointCost: 0,
      text: "Throw at your enemy to deal damage and make them bleed",
    },
    {
      pointCost: 0,
      text: "Throw at your enemy to deal damage and mark them for death",
    },
    {
      pointCost: 0,
      text: "Throw at your enemy to deal damage and slow them down",
    },
    {
      pointCost: 0,
      text: "Throw at your enemy to deal damage and set them on fire",
    },
  ],

  Medi_Gun: [
    {
      pointCost: -1,
      text: "ÜberCharge grants +100% speed of movement and attack",
    },
    {
      pointCost: -1,
      text: "ÜberCharge grants +300% faster control point capture rate",
    },
    { pointCost: -1, text: "ÜberCharge grants invisibility" },
    { pointCost: -1, text: "ÜberCharge grants the ability to fly" },
  ],

  Sapper: [
    {
      pointCost: 0,
      text: "Place on enemy buildings to disable and slowly drain away its health",
    },
    {
      pointCost: 0,
      text: "Place on enemy buildings to disable for 10 seconds. Deals no damage",
    },
    {
      pointCost: 0,
      text: "Place on enemy buildings to drain their health faster than regular sapper. Does not disable the building",
    },
    {
      pointCost: 0,
      text: "Place on friendly buildings to improve their performance by 20% at the cost of 30% of their health. Lasts 20 seconds",
    },
  ],

  Drink_Can: [
    {
      pointCost: 0,
      text: "While effect is active: All attacks cause additional explosive damage",
    },
    {
      pointCost: 0,
      text: "While effect is active: All attacks cause additional bleed damage",
    },
    {
      pointCost: 0,
      text: "While effect is active: 30% of all inflicted damage is returns as healing",
    },
    {
      pointCost: 0,
      text: "While effect is active: User can air-jump 2 more times",
    },
    {
      pointCost: 0,
      text: "While effect is active: Grants 35% resistance to all damage",
    },
  ],
  Heavy_Food: [
    {
      pointCost: -1,
      text: "Eat to receive 15% damage resistance for 10 seconds. Alt-fire: Share with a friend (Small Health Kit)",
    },
    {
      pointCost: -1,
      text: "Eat to receive 25% walking speed boost for 15 seconds. Alt-fire: Share with a friend (Small Health Kit)",
    },
    {
      pointCost: -1,
      text: "A box of ammunition. Refills your ammo when used. Alt-fire: Share with a friend (Medium Ammo Kit)",
    },
  ],
  Demoknight_Shield: [
    {
      pointCost: 0,
      text: "Alt-Fire: Charge toward your enemies and remove debuffs. Gain a critical melee strike after impacting an enemy at distance",
    },
    {
      pointCost: 0,
      text: "Alt-Fire: Charge toward your enemies and remove debuffs. Restore health after impacting an enemy",
    },
    {
      pointCost: 0,
      text: "Alt-Fire: Charge toward your enemies and remove debuffs. Slows enemies on impact",
    },
    {
      pointCost: 0,
      text: "Alt-Fire: Charge toward your enemies and remove debuffs. On impact enemies receive great knockback",
    },
  ],
  Banner: [
    {
      pointCost: -1,
      text: "While active: Provides group buff that slowly heals nearby teammates",
    },
    {
      pointCost: -1,
      text: "While active: Provides group buff that increases the attack rate of nearby teammates",
    },
    {
      pointCost: -1,
      text: "While active: Provides group debuff that makes nearby enemies 20% more vulnerable to all damage",
    },
  ],

  Explosive_Melee: [
    { pointCost: 1, text: "The first hit will cause an explosion" },
    {
      pointCost: 1,
      text: "The first hit will apply great knockback on the enemy",
    },
    {
      pointCost: 1,
      text: "The first hit will attach the enemy to you. Neither will be able to move far from the other",
    },
  ],

  Pybro_Melee: [
    { pointCost: 1, text: "Damage removes Sappers" },
    {
      pointCost: 1,
      text: "Hitting friendly buildings helps them deploy faster",
    },
    {
      pointCost: 1,
      text: "Hitting friendly buildings makes them immune to sappers for 5 seconds",
    },
    {
      pointCost: 1,
      text: "Hitting friendly buildings makes them operate 15% faster for 5 seconds",
    },
  ],
  Melee_with_Projectile: [
    {
      pointCost: 1,
      text: "Alt-Fire: Launches a projectile that makes enemies bleed",
    },
    {
      pointCost: 1,
      text: "Alt-Fire: Launches a projectile that slows enemies",
    },
    {
      pointCost: 1,
      text: "Alt-Fire: Launches a projectile that applies knockback on enemies",
    },
    {
      pointCost: 1,
      text: "Alt-Fire: Launches a projectile that heals teammates",
    },
    {
      pointCost: 1,
      text: "Alt-Fire: Launches a projectile that makes teammates faster",
    },
    {
      pointCost: 1,
      text: "Alt-Fire: Launches a projectile that deals mini-crit damage",
    },
    {
      pointCost: 1,
      text: "Alt-Fire: Launches a projectile that explodes on impact",
    },
    {
      pointCost: 1,
      text: "Alt-Fire: Launches a projectile that disables sentries for 2 seconds",
    },
    {
      pointCost: 1,
      text: "Alt-Fire: Launches a projectile that forces enemy to reload",
    },
  ],
};

const weaponEffects = [
  //// AllReloading ////
  {
    cost: 1,
    for: weaponTypeGroups.AllReloading,
    pro: "<value>% faster reload speed",
    con: "<value>% slower reload speed",
    valuePro: 20,
    valueCon: 20,
  },
  //// AllBullet ////
  {
    cost: 1,
    for: weaponTypeGroups.AllBullet,
    pro: "On Headshot: +<value>% damage",
    con: "On Hit: -<value>% damage if the hit wasn't a headshot",
    valuePro: 30,
    valueCon: 10,
  },
  {
    cost: 1,
    for: weaponTypeGroups.AllBullet,
    pro: "On Headshot: +<value>% damage",
    con: "On Hit: -<value>% damage if the hit wasn't a headshot",
    valuePro: 30,
    valueCon: 10,
  },
  {
    cost: 1,
    for: weaponTypeGroups.AllBullet,
    pro: "<value>% less bullet spread",
    con: "<value>% more bullet spread",
    valuePro: 30,
    valueCon: 30,
  },
  {
    cost: 1,
    for: weaponTypeGroups.AllBullet,
    pro: "Bullets pass through enemies",
    con: "Bullets cannot pass through allies",
  },
  {
    cost: 1,
    for: weaponTypeGroups.AllBullet,
    pro: "Reduced falloff damage correction",
    con: "Increased falloff damage correction",
  },
  //// AllAutomatic ////
  {
    cost: 1,
    for: weaponTypeGroups.AllAutomatic,
    pro: "Weapon firing speed increases as it gets fired for longer",
    con: "Weapon firing speed decreases as it gets fired for longer",
  },
  //// AllExplosive ////
  {
    cost: 1,
    for: weaponTypeGroups.AllExplosive,
    pro: "<value>% larger explosion radius",
    con: "<value>% smaller explosion radius",
    valuePro: 20,
    valueCon: 20,
  },
  {
    cost: 1,
    for: weaponTypeGroups.AllExplosive,
    pro: "<value>% stronger explosion knockback",
    con: "<value>% weaker explosion knockback",
    valuePro: 50,
    valueCon: 50,
  },
  {
    cost: 1,
    for: weaponTypeGroups.AllExplosive,
    pro: "<value>% less damage to self",
    con: "<value>% more damage to self",
    valuePro: 35,
    valueCon: 35,
  },
  //// AllCanHit ////
  {
    cost: 1,
    for: weaponTypeGroups.AllCanHit,
    pro: "On Hit: +<value> HP",
    con: "On Miss: -<value> HP",
    valuePro: 15,
    valueCon: 15,
  },
  {
    cost: 1,
    for: weaponTypeGroups.AllCanHit,
    pro: "On Hit: Receive a small speed boost for <value> seconds",
    con: "On Miss: Receive a small slow run debuf for <value> seconds",
    valuePro: 3,
    valueCon: 3,
  },
  {
    cost: 1,
    for: weaponTypeGroups.AllCanHit,
    pro: "On Hit Teammate: Grant <value>% faster firing rate to both for 4 seconds",
    con: "On Miss: <value>% slower firing rate for the next 4 seconds",
    valuePro: 30,
    valueCon: 15,
  },
  {
    cost: 1,
    for: weaponTypeGroups.AllCanHit,
    pro: "On Hit: Enemy moves <value>% slower for 3 seconds",
    con: "On Miss: You move <value>% slower for 3 seconds",
    valuePro: 20,
    valueCon: 20,
  },
  //// All ////
  {
    cost: 1,
    for: weaponTypeGroups.All,
    pro: "+<value> Max HP",
    con: "-<value> Max HP",
    valuePro: 30,
    valueCon: 30,
  },
  {
    cost: 1,
    for: weaponTypeGroups.All,
    pro: "+<value>% Max HP",
    con: "-<value>% Max HP",
    valuePro: 20,
    valueCon: 20,
  },
  {
    cost: 1,
    for: weaponTypeGroups.All,
    pro: "+<value>% ammo on all weapons",
    con: "-<value>% ammo on all weapons",
    valuePro: 30,
    valueCon: 30,
  },
  {
    cost: 1,
    for: weaponTypeGroups.All,
    pro: "Heals up to +<value> HP per second, while not taking damage",
    con: "Bleeds up to -<value> HP per second, after not receiving healing for a while",
    valuePro: 3,
    valueCon: 3,
  },
  {
    cost: 1,
    for: weaponTypeGroups.All,
    pro: "<value>% faster running speed",
    con: "<value>% slower running speed",
    valuePro: 10,
    valueCon: 10,
  },
  {
    cost: 1,
    for: weaponTypeGroups.All,
    pro: "This weapon deploys <value>% faster",
    con: "This weapon deploys <value>% slower",
    valuePro: 40,
    valueCon: 40,
  },
  {
    cost: 1,
    for: weaponTypeGroups.All,
    pro: "Can see the HP of enemies",
    con: "Enemies can see your HP",
  },
  //// AllDoesDamage ////
  {
    cost: 1,
    for: weaponTypeGroups.AllDoesDamage,
    pro: "+<value>% damage increase",
    con: "-<value>% damage penalty",
    valuePro: 15,
    valueCon: 20,
  },
  {
    cost: 1,
    for: weaponTypeGroups.AllDoesDamage,
    pro: "On Hit: Causes enemy to bleed for <value> seconds",
    con: "On Miss: Causes you to bleed for <value> seconds",
    valuePro: 5,
    valueCon: 2,
  },
  {
    cost: 1,
    for: weaponTypeGroups.AllDoesDamage,
    pro: "On Hit: Makes enemies unable to switch weapons for <value> seconds",
    con: "On Miss: Makes you unable to switch weapons for <value> seconds",
    valuePro: 5,
    valueCon: 3,
  },
  {
    cost: 1,
    for: weaponTypeGroups.AllDoesDamage,
    pro: "On Hit: Makes enemies unable to reload weapons for <value> seconds",
    con: "On Miss: Makes you unable to reload weapons for <value> seconds",
    valuePro: 5,
    valueCon: 3,
  },
  {
    cost: 1,
    for: weaponTypeGroups.AllDoesDamage,
    pro: "Crits whenever it would normally mini-crit",
    con: "Cannot Crit",
  },
  {
    cost: 1,
    for: weaponTypeGroups.AllDoesDamage,
    pro: "Increased chance of random critical hit",
    con: "No random critical hits",
  },
  {
    cost: 1,
    for: weaponTypeGroups.AllDoesDamage,
    pro: "On Hit: +<value>% more damage when attacking from behind the enemy",
    con: "On Hit: -<value>% less damage when not attacking from behind the enemy",
    valuePro: 10,
    valueCon: 10,
  },
  //// AllHasClip ////
  {
    cost: 1,
    for: weaponTypeGroups.AllHasClip,
    pro: "+<value>% larger clip size",
    con: "-<value>% smaller clip size",
    valuePro: 20,
    valueCon: 20,
  },
  //// BurstBullet ////
  {
    cost: 1,
    for: weaponTypeGroups.BurstBullet,
    pro: "Bullets fire in a fixed pattern",
    con: "Bullets fire with increased random spread",
  },
  {
    cost: 1,
    for: weaponTypeGroups.BurstBullet,
    pro: "On Hit: Do +<value>% damage if every single bullet connects to the same enemy",
    con: "On Hit: -<value>% damage if even one bullet missed the enemy",
    valuePro: 20,
    valueCon: 20,
  },
  {
    cost: 1,
    for: weaponTypeGroups.BurstBullet,
    pro: "On Hit: Heal <value> HP per connecting bullet",
    con: "On Shot: Mini explosion in your hands - lose <value> HP from bleeding",
    valuePro: 2,
    valueCon: 2,
  },
  {
    cost: 1,
    for: weaponTypeGroups.BurstBullet,
    pro: "+<value>% more bullets per shot",
    con: "-<value>% less bullets per shot",
    valuePro: 20,
    valueCon: 20,
  },
  {
    cost: 1,
    for: weaponTypeGroups.BurstBullet,
    pro: "On Hit: If all bullets connect, deals additional bleed damage as strong as <value>% of the attack",
    con: "On Miss: Bleed losing -<value> HP",
    valuePro: 30,
    valueCon: 10,
  },
  // TODO: //// SingleBullet ////
  {
    cost: 1,
    for: weaponTypeGroups.SingleBullet,
    pro: "On Headshot: Next reload will be <value>% faster",
    con: "On Miss: Next reload will be <value>% slower",
    valuePro: 50,
    valueCon: 50,
  },
  {
    cost: 1,
    for: weaponTypeGroups.SingleBullet,
    pro: "On Headshot: Deal +<value>% damage",
    con: "On Hit: Deal -<value>% damage if hit was not a headshot",
    valuePro: 20,
    valueCon: 20,
  },
  //// SemiAutomaticBullet ////
  {
    cost: 1,
    for: weaponTypeGroups.SemiAutomaticBullet,
    pro: "+<value>% faster firing rate when shooting bullets individually (1-press, 1-bullet)",
    con: "-<value>% slower firing rate when shooting bullets by holding the trigger (1-press, many bullets)",
    valuePro: 20,
    valueCon: 20,
  },
  //// Minigun ////
  {
    cost: 1,
    for: ["Minigun"],
    pro: "Weapon slowly restores ammo when revved up without shooting. (But produces louder noise)",
    con: "Weapon cannot be revved up without shooting",
  },
  {
    cost: 1,
    for: ["Minigun"],
    pro: "+<value>% increased walking speed while revved up",
    con: "-<value>% decreased walking speed while revved up",
    valuePro: 20,
    valueCon: 20,
  },
  //// Flamethrower ////
  {
    cost: 1,
    for: weaponTypeGroups.Flamethrower,
    pro: "Deals +<value>% more damage when burning the enemy from behind",
    con: "Deals -<value>% more damage when not burning the enemy from behind",
    valuePro: 20,
    valueCon: 20,
  },
  {
    cost: 1,
    for: weaponTypeGroups.Flamethrower,
    pro: "Flames linger in the air for <value> second(s)",
    con: "Flames linger in the air for <value> second(s), but passing through them deals mini-crit damage to you",
    valuePro: 1,
    valueCon: 1,
  },
  {
    cost: 1,
    for: weaponTypeGroups.Flamethrower,
    pro: "Flames reach is +<value>% farther",
    con: "Flames reach is -<value>% shorter",
    valuePro: 20,
    valueCon: 20,
  },
  //// AllAfterburn ////
  {
    cost: 1,
    for: weaponTypeGroups.AllAfterburn,
    pro: "+<value>% increased afterburn damage",
    con: "-<value>% decreased afterburn damage",
    valuePro: 20,
    valueCon: 20,
  },
  {
    cost: 1,
    for: weaponTypeGroups.AllAfterburn,
    pro: "+<value>% increased afterburn duration",
    con: "-<value>% decreased afterburn duration",
    valuePro: 50,
    valueCon: 50,
  },
  //// AllProjectile ////
  {
    cost: 1,
    for: weaponTypeGroups.AllProjectile,
    pro: "<value>% faster projectile speed",
    con: "<value>% slower projectile speed",
    valuePro: 40,
    valueCon: 40,
  },
  // TODO: //// SingleShotProjectile ////
  {
    cost: 1,
    for: weaponTypeGroups.SingleShotProjectile,
    pro: "On Hit: Loading next shot will be +<value>% faster",
    con: "On Miss: Loading next shot will be -<value>% slower",
    valuePro: 50,
    valueCon: 50,
  },
  //// AllReflectableDamageProjectile ////
  {
    cost: 1,
    for: weaponTypeGroups.AllReflectableDamageProjectile,
    pro: "Projectile cannot be reflected",
    con: "Projectile deals 100% crit damage when reflected",
    valuePro: 30,
    valueCon: 30,
  },
  //// AutomaticProjectiles ////
  {
    cost: 1,
    for: weaponTypeGroups.AutomaticProjectiles,
    pro: "Consecutive hits deal +<value> more damage than the previous hit",
    con: "Consecutive hits deal -<value> less damage than the previous hit",
    valuePro: 1,
    valueCon: 1,
  },
  //// ConsumableProjectile ////
  {
    cost: 1,
    for: weaponTypeGroups.ConsumableProjectile,
    pro: "+<value>% faster recharge time",
    con: "-<value>% slower recharge time",
    valuePro: 40,
    valueCon: 40,
  },
  {
    cost: 1,
    for: weaponTypeGroups.ConsumableProjectile,
    pro: "+<value>% increased movement speed after launching the projectile for 4 seconds",
    con: "-<value>% decreased movement speed after launching the projectile for 4 seconds",
    valuePro: 15,
    valueCon: 15,
  },
  //// Rocket_Launcher, Pipe_Launcher ////
  {
    cost: 1,
    for: ["Rocket_Launcher", "Pipe_Launcher"],
    pro: "Projectile explodes on direct hit, but also bounces off from the enemy to explode again when hitting any surface, dealing <value>% damage",
    pro: "Projectile does not explode on direct hit, but instead bounces off from the enemy to explode when hitting any surface, dealing <value>% damage",
    valuePro: 40,
    valueCon: 60,
  },
  {
    cost: 1,
    for: ["Rocket_Launcher", "Pipe_Launcher"],
    pro: "Projectile can bounce on terrain once and still direct hit the enemy. It breaks apart if it touches terrain for a second time",
    pro: "Projectile breaks apart if it touches terrain",
    valuePro: 50,
    valueCon: 50,
  },
  // TODO: //// Medi_Gun ////
  {
    cost: 1,
    for: ["Medi_Gun"],
    pro: "Accumulate ÜberCharge +<value>% faster",
    pro: "Accumulate ÜberCharge -<value>% slower",
    valuePro: 15,
    valueCon: 15,
  },
  {
    cost: 1,
    for: ["Medi_Gun"],
    pro: "Heal +<value>% more HP per second",
    pro: "Heal -<value>% less HP per second",
    valuePro: 10,
    valueCon: 10,
  },
  {
    cost: 1,
    for: ["Medi_Gun"],
    pro: "Heals teammates near to the Medi Gun target for <value>% of the target healing",
    pro: "Drains HP from teammates near to the Medi Gun target for <value>% of the target, if health of these teammates is more than 50",
    valuePro: 10,
    valueCon: 10,
  },
  //// Sapper ////
  {
    cost: 1,
    for: ["Sapper"],
    pro: "Sapped buildings are disabled for <value> seconds after the sapper is removed",
    pro: "Sapped buildings are not disabled for <value> seconds after the sapper is placed",
    valuePro: 2,
    valueCon: 2,
  },
  {
    cost: 1,
    for: ["Sapper"],
    pro: "Alt-Fire: Can throw sapper from a distance, but cannot apply sapper for 4 seconds after that",
    pro: "After applying sapper, cannot apply again for 2 seconds",
  },
  {
    cost: 1,
    for: ["Sapper"],
    pro: "Can apply sapper while invisible",
    pro: "Cannot apply sapper while disguised",
  },
  //// ConsumablePassive ////
  {
    cost: 1,
    for: weaponTypeGroups.ConsumableProjectile,
    pro: "+<value>% faster recharge rate",
    con: "-<value>% slower recharge rate",
    valuePro: 25,
    valueCon: 25,
  },
  {
    cost: 1,
    for: weaponTypeGroups.ConsumableProjectile,
    pro: "+<value>% faster usage time",
    con: "-<value>% slower usage time",
    valuePro: 50,
    valueCon: 50,
  },
  //// ChargeablePassive ////
  {
    cost: 1,
    for: weaponTypeGroups.ConsumableProjectile,
    pro: "Charge requires -<value>% less time",
    con: "Charge requires +<value>% more time",
    valuePro: 30,
    valueCon: 30,
  },
  // TODO: //// Passive ////
  // TODO: //// Melee ////
  // TODO: //// AllScout ////
  // TODO: //// AllSoldier ////
  // TODO: //// AllPyro ////
  // TODO: //// AllDemoman ////
  // TODO: //// AllHeavy ////
  // TODO: //// AllEngineer ////
  // TODO: //// AllMedic ////
  // TODO: //// AllSniper ////
  // TODO: //// AllSpy ////
  // TODO: //// AllDemoknight ////
];

generateBtn.addEventListener("click", () => {
  const playerClass = playerClassSelect.value;
  const weaponSlot = weaponSlotSelect.value;
  const powerLevel = powerLevelSelect.value;

  const weapon = generateWeapon(
    parseInt(playerClass) || getRandom(1, 9),
    parseInt(weaponSlot) || getRandom(1, 3),
    parseInt(powerLevel)
  );

  generatedWeaponArea.innerHTML = formatWeaponAsHtml(weapon);
});

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateWeapon(playerClass, weaponSlot, powerLevel) {
  const weaponType = selectWeaponType(playerClass, weaponSlot, powerLevel);
  const modificationCounts = getRandom(1, 2);

  const proBoost = Math.max(0, weaponType.needsBoost);
  const conBoost = Math.max(0, -weaponType.needsBoost);

  const weapon = {
    playerClass: playerClass,
    playerClassName: strings.classes[playerClass],
    weaponSlot: weaponSlot,
    weaponSlotName: strings.slots[weaponSlot],
    type: weaponType.name,
    proPoints: modificationCounts + proBoost,
    conPoints: modificationCounts + conBoost,
    pros: [],
    cons: [],
  };

  addMandatoryPro(weapon);
  addWeaponProsAndCons(weapon);

  return weapon;
}

function addMandatoryPro(weapon) {
  const mandatoryProOptions = mandatoryPros[weapon.type];
  if (!mandatoryProOptions || !mandatoryProOptions.length) return;
  const selectedPro =
    mandatoryProOptions[getRandom(0, mandatoryProOptions.length - 1)];

  weapon.pros.push(selectedPro.text);
  weapon.proPoints -= selectedPro.pointCost;

  if (weapon.proPoints < 0) {
    weapon.conPoints += -weapon.proPoints;
    weapon.proPoints = 0;
  }
}

function addWeaponProsAndCons(weapon) {
  // TODO: Implement a way to select pros and cons for a weapon
  //      - 1 - count how many pros and cons we need combined
  //      - 2 - filter all effect options that can be applied to this weapon
  //      - 3 - select pros and cons randomly from the options
  //      - 4 - a pro option and a con option cannot be the same
  //      - 5 - if pro or con options were repeated and cannot be combined - replace the repeat
  //      - 6 - if pro or con options were repeated and they can be combined - combine them
  //      - 7 - add some randomness to all options that have values
  //      - 8 - add the pros and cons to the weapon
  //      - 9 - done!
}

function selectWeaponType(playerClass, weaponSlot, powerLevel) {
  const classWeapons = weaponTypesByClass[playerClass - 1];
  const possibleChoices = classWeapons.filter((w) => w.slot === weaponSlot);
  const choice = cloneJson(
    possibleChoices[getRandom(0, possibleChoices.length - 1)]
  );
  choice.type.needsBoost = choice.type.needsBoost || 0;
  choice.type.needsBoost += powerLevel;
  return choice.type;
}

function cloneJson(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function formatWeaponAsHtml(weaponObject) {
  return JSON.stringify(weaponObject, null, 2).replace(/\n/g, "<br>");
}
