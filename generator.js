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

const weaponTypeGroups = {
  // BASIC GROUPS //
  BurstBullet: ["Scattergun", "Shotgun"],
  SingleBullet: ["Sniper_Rifle"],
  SemiAutomaticBullet: ["Sniper_Rifle", "Spy_Revolver", "Pistol"],
  AutomaticBullet: ["Minigun", "Submachine_Gun"],
  AutomaticFlame: ["Flamethrower"],
  Projectile: ["Bow_and_Arrows", "Flare_Gun"],
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
weaponTypeGroups.AllProjectile = [
  ...weaponTypeGroups.Projectile,
  ...weaponTypeGroups.AutomaticProjectiles,
  ...weaponTypeGroups.ConsumableProjectile,
  ...weaponTypeGroups.ExplosiveProjectile,
  "Melee_with_Projectile",
];
weaponTypeGroups.AllAutomatic = [
  ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.AutomaticFlame,
  ...weaponTypeGroups.AutomaticProjectiles,
];
weaponTypeGroups.AllPassive = [
  ...weaponTypeGroups.ConsumablePassive,
  ...weaponTypeGroups.ChargeablePassive,
  ...weaponTypeGroups.Passive,
];
weaponTypeGroups.All = [
  ...weaponTypeGroups.BurstBullet,
  ...weaponTypeGroups.SingleBullet,
  ...weaponTypeGroups.SemiAutomaticBullet,
  ...weaponTypeGroups.AutomaticBullet,
  ...weaponTypeGroups.AutomaticFlame,
  ...weaponTypeGroups.Projectile,
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
  addWeaponPros(weapon);
  addWeaponCons(weapon);

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

function addWeaponPros(weapon) {}

function addWeaponCons(weapon) {}

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
