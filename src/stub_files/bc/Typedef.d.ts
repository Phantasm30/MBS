//#region Common

declare namespace SocketIO {
	type Socket = import("socket.io-client").Socket;
}

declare function io(serv: string): SocketIO.Socket;

interface String {
	replaceAt(index: number, character: string): string;
}

declare function parseInt(s: string | number, radix?: number): number;

type MemoizedFunction<T extends Function> = T & {
	/** Clears the cache of the memoized function */
	clearCache(): void;
};

// GL shim
interface WebGL2RenderingContext {
	program?: WebGLProgram;
	programFull?: WebGLProgram;
	programHalf?: WebGLProgram;
	programTexMask?: WebGLProgram;
	textureCache?: Map<string, { width: number, height: number, texture: WebGLTexture }>;
	maskCache?: Map<string, WebGLTexture>;
}

interface WebGLProgram {
	u_alpha?: WebGLUniformLocation;
	u_color?: WebGLUniformLocation;
	a_position?: number;
	a_texcoord?: number;
	u_matrix?: WebGLUniformLocation;
	u_texture?: WebGLUniformLocation;
	u_alpha_texture?: WebGLUniformLocation;
	position_buffer?: WebGLBuffer;
	texcoord_buffer?: WebGLBuffer;
}

interface HTMLCanvasElement {
	GL?: WebGL2RenderingContext;
}

interface HTMLImageElement {
	errorcount?: number;
}

interface HTMLElement {
	setAttribute(qualifiedName: string, value: any): void;
}

interface RGBColor {
	r: number;
	g: number;
	b: number;
}

interface RGBAColor extends RGBColor {
	a: number;
}

/** A 4-tuple with X & Y coordinates, width and height */
type RectTuple = [X: number, Y: number, W: number, H: number];

/** A 4-tuple with X & Y coordinates and, optionally, width and height */
type PartialRectTuple = [X: number, Y: number, W?: number, H?: number];

type CommonSubstituteReplacer = (match: string, offset: number, replacement: string, string: string) => string;
type CommonSubtituteSubstitution = [tag: string, substitution: string, replacer?: CommonSubstituteReplacer];

interface CommonGenerateGridParameters {
	/** Starting X coordinate of the grid */
	x: number,
	/** Starting Y coordinate of the grid */
	y: number,
	/** Maximum width of the grid */
	width: number,
	/** Maximum height of the grid */
	height: number,
	/** Width of one grid item */
	itemWidth: number,
	/** Height of one grid item */
	itemHeight: number,
}

type CommonGenerateGridCallback<T> = (item: T, x: number, y: number, width: number, height: number) => boolean;

//#endregion

//#region Enums

type DialogMenuMode = "dialog" | "items" | "colorDefault" | "colorExpression" | "colorItem" | "permissions" | "activities" | "locking" | "locked" | "extended" | "tighten" | "crafted" | "struggle";

type DialogMenuButton = "Activity" |
	"ColorCancel" | "ColorChange" | "ColorChangeMulti" | "ColorDefault" | "ColorPickDisabled" | "ColorSelect" |
	"Crafting" |
	"DialogNormalMode" | "DialogPermissionMode" |
	"Dismount" | "Escape" | "Remove" |
	"Exit" |
	"GGTSControl" |
	"InspectLock" | "InspectLockDisabled" |
	"Lock" | "LockDisabled" | "LockMenu" |
	"Next" | "Prev" | "PickLock" | "PickLockDisabled" |
	"Remote" | "RemoteDisabled" | `RemoteDisabledFor${VibratorRemoteAvailability}` |
	"Unlock" | "Use" | "UseDisabled" | "Struggle" | "TightenLoosen" |
	// Wardrobe buttons
	"Wardrobe" | "WardrobeDisabled" | "Reset" | "WearRandom" | "Random" | "Naked" | "Accept" | "Cancel" | "Character"
	;

type DialogSortOrder = | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type DialogStruggleActionType = "ActionUse" | "ActionSwap" | "ActionRemove" | "ActionUnlock" | "ActionUnlockAndRemove" | "ActionStruggle" | "ActionEscape" | "ActionDismount";

type CharacterType = "online" | "npc" | "simple";

type VibratorIntensity = -1 | 0 | 1 | 2 | 3;

type VibratorModeState = "Default" | "Deny" | "Orgasm" | "Rest";

type VibratorMode = "Off" | "Low" | "Medium" | "High" | "Maximum" | "Random" | "Escalate" | "Tease" | "Deny" | "Edge";

type VibratorRemoteAvailability = "Available" | "NoRemote" | "NoRemoteOwnerRuleActive" | "NoLoversRemote" | "RemotesBlocked" | "CannotInteract" | "NoAccess" | "InvalidItem";

type ItemVulvaFuturisticVibratorAccessMode = "" | "ProhibitSelf" | "LockMember";

/**
 * @property Freeze - Prevents walking and kneeling unaided. There's a few caveats with the kneeling part.
 * @property Prone - Indicates the character is prone. Looks non-functional.
 * @property Block - Indicates that the character is "blocked". Acts as a restraint.
 * @property Mounted - Indicates that the character is mounted onto something. Acts as a restraint and blocks moving around.
 * @property KneelFreeze - Prevents walking.
 * @property ForceKneel - Prevents kneeling unaided.
 * @property BlockKneel - Prevents items that have the CanKneel prerequisite from being applied.
 *
 * @property CuffedFeet - Enable items that have the CuffedFeet prerequisite to be applied.
 * @property CuffedLegs - Enable items that have the CuffedLegs prerequisite to be applied.
 * @property CuffedArms - Enable items that have the CuffedArms prerequisite to be applied.
 * @property IsChained - Prevents items that have the NotChained prerequisite from being applied.
 * @property FixedHead - Locks the character's head in-place. Prevents nodding and shaking activities on it.
 * @property MergedFingers - Indicates the character can't use their fingers normally. Limits activities.
 *
 * @property Shackled - Prevents items that have the NotShackled prerequisite from being applied.
 * @property Tethered - Prevents leashing items from working.
 * @property Enclose - Indicates the character cannot be interacted with and can't interact back.
 * @property OneWayEnclose - Indicates the character can be interacted with but can't interact back.
 * @property OnBed - Enable items that have the OnBed prerequisite to be applied.
 * @property Lifted - Prevents items that have the NotLifted prerequisite to be applied.
 *
 * @property Slow - Indicates the character is slowed. Used when exiting chatrooms.
 * @property FillVulva - Marks the item as filling the character's vulva.
 *   Used when checking activities' prerequisites and the auto-stimulation events.
 * @property ShaftVulva - Marks the item as being some sort of shaft extending out of the vulva.
 *   Used to block things like chastity from closing.
 * @property IsPlugged - Marks the item as filling the character's butt.
 * @property IsPlugged - Marks the item as filling the character's butt.
 *   Used when checking activities' prerequisites and the auto-stimulation events.
 *
 * @property Egged - Marks the item as being a "vibrator" kind-of item.
 *   Make the item's Vibrator-related properties be taken into account for arousal,
 *   as well as the stuttering effect.
 * @property Vibrating - Indicates an "Egged" item as being vibrating.
 *   Normally handled automatically by VibrationMode. Makes the item preview wobble
 *   in the inventory, as well as cause auto-stimulation events.
 *
 * @property Edged - Marks the item as causing the character to be edged.
 *   Normally handled automatically by VibrationMode. Causes the character's arousal
 *   to be capped, and ruins its orgasms.
 * @property DenialMode - Marks the item as causing the character to be denied.
 *   Causes the character's arousal to be capped (higher that Edged).
 * @property RuinOrgasms - Marks the item as ruining orgasms.
 *   Requires DenialMode. Makes the character unable to fully orgasm.
 *
 * @property Remote - Marks the item as a remote. Looks non-functional.
 * @property UseRemote - Marks the item as needing a remote to be changed.
 * @property BlockRemotes - Marks the item as preventing remotes from being used
 *   on the character.
 *
 * @property Lock - Marks the item as being some kind of lock.
 * @property NotSelfPickable - Disables the item from being lock-picked.
 *
 * @property Chaste - Marks the item as applying chastity.
 *   Prevents items that have the NotChaste prerequisite from being applied.
 *   Allows the item to be taken off at the club management.
 * @property BreastChaste - Marks the item as applying breast chastity.
 *   Allows the item to be taken off at the club management.
 *
 * @property Leash - Marks the item as being usable as a leash.
 * @property IsLeashed - Marks a leash item as being held.
 * @property CrotchRope - Marks the item as being a crotchrope-style item.
 *   Used for the auto-stimulation events.
 *
 * @property ReceiveShock - Marks the item as being a shock-dispensing item.
 * @property TriggerShock - Marks the item as being a trigger for shock-dispensing items.
 *
 * @property OpenPermission - Marks the item as requiring collar-permissions (Futuristic).
 * @property OpenPermissionArm - Marks the item as requiring arm-permissions (Futuristic).
 * @property OpenPermissionLeg - Marks the item as requiring arm-permissions (Futuristic).
 * @property OpenPermissionChastity - Marks the item as requiring chastity-permissions (Futuristic).
 *
 * @property BlockMouth - Marks the item as blocking the character's mouth.
 *   Prevents items that have the NotLifted prerequisite to be applied.
 *   Also used when checking activities' prerequisites.
 * @property OpenMouth - Marks the item as opening the character's mouth.
 *   Used when checking activities' prerequisites.
 *
 * @property ProtrudingMouth - Indicates that the item bulges out from the character's mouth.
 *   Prevents items that wrap the head to be applied.
 *
 * @property Wiggling - Indicates that the item hangs from the character and can wiggle from it,
 *   triggering arousal. Used as part of the stimulation event system.
 */
type EffectName =
	"Freeze" | "Prone" | "Block" | "Mounted" | "KneelFreeze" | "ForceKneel" | "BlockKneel" |

	"CuffedFeet" | "CuffedLegs" | "CuffedArms" | "IsChained" | "FixedHead" | "MergedFingers" |

	"Shackled" | "Tethered" | "Enclose" | "OneWayEnclose" | "OnBed" | "Lifted" | "Suspended" |

	"Slow" | "FillVulva" | "VulvaShaft" | "IsPlugged" |

	"Egged" | "Vibrating" |

	"Edged" | "DenialMode" | "RuinOrgasms" |

	"Remote" | "UseRemote" | "BlockRemotes" |

	"Lock" | "NotSelfPickable" |

	"Chaste" | "BreastChaste" | "ButtChaste" |

	"Leash" | "IsLeashed" | "CrotchRope" |

	"ReceiveShock" | "TriggerShock" |

	"OpenPermission" | "OpenPermissionArm" | "OpenPermissionLeg" | "OpenPermissionChastity" |

	"BlockMouth" | "OpenMouth" |

	"GagVeryLight" | "GagEasy" | "GagLight" | "GagNormal" | "GagMedium" | "GagHeavy" | "GagVeryHeavy" | "GagTotal" |

	// Those are only supposed to be "transient", as in, they appear because of stacked gags
	"GagTotal2" | "GagTotal3" | "GagTotal4" |

	"BlindLight" | "BlindNormal" | "BlindHeavy" | "BlindTotal" |
	"BlurLight" | "BlurNormal" | "BlurHeavy" | "BlurTotal" |
	"DeafLight" | "DeafNormal" | "DeafHeavy" | "DeafTotal" |

	"VR" | "VRAvatars" | "KinkyDungeonParty" |

	"LightBall" |

	"RegressedTalk" |

	"HideRestraints" |

	"Unlock-MetalPadlock" | "Unlock-OwnerPadlock" | "Unlock-OwnerTimerPadlock" |
	"Unlock-LoversPadlock" | "Unlock-LoversTimerPadlock" |
	"Unlock-FamilyPadlock" |
	"Unlock-MistressPadlock" | "Unlock-MistressTimerPadlock" |
	"Unlock-PandoraPadlock" |

	"Unlock-MetalCuffs" | "Unlock-EscortAnkleCuffs" | "Unlock-PortalPanties" |

	// XXX: only for lockpicks?
	"Unlock-" |

	"ProtrudingMouth" | "Wiggling" |
	""
	;

interface ExpressionNameMap {
	Eyebrows: null | "Raised" | "Lowered" | "OneRaised" | "Harsh" | "Angry" | "Soft",
	Eyes: (
		null | "Closed" | "Dazed" | "Shy" | "Sad" | "Horny" | "Lewd" | "VeryLewd" |
		"Heart" | "HeartPink" | "LewdHeart" | "LewdHeartPink" | "Dizzy" | "Daydream" |
		"ShylyHappy" | "Angry" | "Surprised" | "Scared"
	),
	Eyes2: ExpressionNameMap["Eyes"],
	Mouth: (
		null | "Frown" | "Sad" | "Pained" | "Angry" | "HalfOpen" | "Open" | "Ahegao" | "Moan" |
		"TonguePinch" | "LipBite" | "Happy" | "Devious" | "Laughing" | "Grin" | "Smirk" | "Pout"
	),
	Pussy: null | "Hard",
	Blush: null | "Low" | "Medium" | "High" | "VeryHigh" | "Extreme" | "ShortBreath",
	Fluids: (
		null | "DroolLow" | "DroolMedium" | "DroolHigh" | "DroolSides" | "DroolMessy" | "DroolTearsLow" |
		"DroolTearsMedium" | "DroolTearsHigh" | "DroolTearsMessy" | "DroolTearsSides" |
		"TearsHigh" | "TearsMedium" | "TearsLow"
	),
	Emoticon: (
		null | "Afk" | "Whisper" | "Sleep" | "Hearts" | "Tear" | "Hearing" | "Confusion" | "Exclamation" |
		"Annoyed" | "Read" | "RaisedHand" | "Spectator" | "ThumbsDown" | "ThumbsUp" | "LoveRope" |
		"LoveGag" | "LoveLock" | "Wardrobe" | "Gaming" | "Coffee"
	),
}

type ExpressionGroupName = keyof ExpressionNameMap;
type ExpressionName = ExpressionNameMap[ExpressionGroupName];

type AssetGroupItemName =
	'ItemAddon' | 'ItemArms' | 'ItemBoots' | 'ItemBreast' | 'ItemButt' |
	'ItemDevices' | 'ItemEars' | 'ItemFeet' | 'ItemHands' | 'ItemHead' |
	'ItemHood' | 'ItemLegs' | 'ItemMisc' | 'ItemMouth' | 'ItemMouth2' |
	'ItemMouth3' | 'ItemNeck' | 'ItemNeckAccessories' | 'ItemNeckRestraints' |
	'ItemNipples' | 'ItemNipplesPiercings' | 'ItemNose' | 'ItemPelvis' |
	'ItemTorso' | 'ItemTorso2'| 'ItemVulva' | 'ItemVulvaPiercings' |
	'ItemHandheld' |

	'ItemHidden' /* TODO: investigate, not a real group */
	;

type AssetGroupScriptName = 'ItemScript';

type AssetGroupBodyName =
	ExpressionGroupName | 'BodyLower' | 'BodyUpper' | 'Bra' | 'Bracelet' | 'Cloth' |
	'ClothAccessory' | 'ClothLower' | 'Corset' | 'FacialHair' | 'Garters' | 'Glasses' | 'Gloves' |
	'HairAccessory1' | 'HairAccessory2' | 'HairAccessory3' | 'HairBack' |
	'HairFront' | 'FacialHair' | 'Hands' | 'Hat' | 'Head' | 'Height' | 'Jewelry' | 'LeftAnklet' | 'LeftHand' | 'Mask' |
	'Necklace' | 'Nipples' | 'Panties' | 'Pronouns' | 'RightAnklet' | 'RightHand' |
	'Shoes' | 'Socks' | 'SocksLeft' | 'SocksRight' | 'Suit' | 'SuitLower' | 'TailStraps' | 'Wings'
	;

type AssetGroupName = AssetGroupBodyName | AssetGroupItemName | AssetGroupScriptName;

type AssetPoseCategory = 'BodyUpper' | 'BodyLower' | 'BodyFull';

type AssetPoseName =
	/* BodyUpper */ 'BaseUpper' | 'BackBoxTie' | 'BackCuffs' | 'BackElbowTouch' | 'OverTheHead' | 'TapedHands' | 'Yoked' |
	/* BodyLower */ 'BaseLower' | 'Kneel' | 'KneelingSpread' | 'LegsClosed' | 'LegsOpen' | 'Spread' |

	/* BodyFull  */ 'Hogtied' | 'AllFours' |
	/* BodyAddon */ 'Suspension'
	;

type AssetPoseMapping = Partial<Record<AssetPoseName, AssetPoseName | "">>;

type AssetLockType =
	"CombinationPadlock" | "ExclusivePadlock" | "HighSecurityPadlock" |
	"IntricatePadlock" | "LoversPadlock" | "LoversTimerPadlock" | "FamilyPadlock" |
	"MetalPadlock" | "MistressPadlock" | "MistressTimerPadlock" |
	"OwnerPadlock" | "OwnerTimerPadlock" | "PandoraPadlock" |
	"PasswordPadlock" | "PortalLinkPadlock" | "SafewordPadlock" | "TimerPadlock" |
	"TimerPasswordPadlock"
	;

type CraftingPropertyType =
	"Normal" | "Large" | "Small" | "Thick" | "Thin" | "Secure" | "Loose" | "Decoy" |
	"Malleable" | "Rigid" | "Simple" | "Puzzling" | "Painful" | "Comfy" | "Strong" |
	"Flexible" | "Nimble" | "Arousing" | "Dull"
	;

type AssetAttribute =
	"Skirt" | "SuitLower" | "UpperLarge" |
	"ShortHair" | "SmallEars" | "NoEars" | "NoseRing" | "HoodieFix" |
	"CanAttachMittens" |
	"PenisLayer" | "PussyLayer" | "GenitaliaCover" | "PussyLight1" | "PussyLight2" | "PussyLight3" | "PussyDark1" | "PussyDark2" | "PussyDark3" |
	"CagePlastic2" | "CageTechno" | "CageFlat" |
	"FuturisticRecolor" | "FuturisticRecolorDisplay" |
	"PortalLinkLockable" | `PortalLinkChastity${string}` | `PortalLinkActivity${ActivityName}` | `PortalLinkTarget${AssetGroupItemName}`
	;

type AssetPrerequisite =
	"AccessBreast" | "AccessBreastSuitZip" | "AccessButt" | "AccessFullPenis" | "AccessMouth" | "AccessTorso" | "AccessVulva" | "AccessCrotch" |
	"AllFours" | "BlockedMouth" | "ButtEmpty" | "CanBeCeilingTethered" | "CanCloseLegs" | "CanCoverVulva" | "CanHaveErection" | "CanKneel" | "CannotBeSuited" | "CannotHaveWand" |
	"ClitEmpty" | "Collared" | "CuffedArms" | "CuffedArmsOrEmpty" | "CuffedFeet" | "CuffedFeetOrEmpty" | "CuffedLegs" | "CuffedLegsOrEmpty" |
	"DisplayFrame" | "EyesEmpty" | "GagCorset" | "GagFlat" | "GagUnique" | "GasMask" | "HasBreasts" | "HasFlatChest" | "HasPenis" | "HasVagina" |
	"HoodEmpty" | "LegsOpen" | "NakedFeet" | "NakedHands" | "NeedsHarness" | "NeedsNippleRings" | "NoChastityCage" | "NoClothLower" | "NoFeetSpreader" | "NoItemArms" |
	"NoItemFeet" | "NoItemHands" | "NoItemLegs" | "NoMaidTray" | "NoOuterClothes" | "NotChained" | "NotChaste" | "NotHogtied" | "NotHorse" | "NotKneeling" |
	"NotKneelingSpread" | "NotLifted" | "NotMasked" | "NotMounted" | "NotProtrudingFromMouth" | "NotShackled" | "NotSuspended" | "NotYoked" | "OnBed" |
	"RemotesAllowed" | "VulvaEmpty"
;

type CraftingStatusType = 0 | 1 | 2;

type ItemColorMode = "Default" | "ColorPicker";

type CharacterHook = "BeforeSortLayers" | "AfterLoadCanvas";

type AnimationDataTypes = "AssetGroup" | "" | "DynamicPlayerCanvas" | "PersistentData" | "Rebuild" | "RefreshTime" | "RefreshRate";

type ChatColorThemeType = "Light" | "Dark" | "Light2" | "Dark2";
type ChatEnterLeaveType = "Normal" | "Smaller" | "Hidden";
type ChatMemberNumbersType = "Always" | "Never" | "OnMouseover";
type ChatFontSizeType = "Small" | "Medium" | "Large";

type ArousalActiveName = "Inactive" | "NoMeter" | "Manual" | "Hybrid" | "Automatic";
type ArousalVisibleName = "All" | "Access" | "Self";
type ArousalAffectStutterName = "None" | "Arousal" | "Vibration" | "All";

type SettingsSensDepName = "SensDepLight" | "Normal" | "SensDepNames" | "SensDepTotal" | "SensDepExtreme";
type SettingsVFXName = "VFXInactive" | "VFXSolid" | "VFXAnimatedTemp" | "VFXAnimated";
type SettingsVFXVibratorName = "VFXVibratorInactive" | "VFXVibratorSolid" | "VFXVibratorAnimated";
type SettingsVFXFilterName = "VFXFilterLight" | "VFXFilterMedium" | "VFXFilterHeavy";

type GraphicsFontName =
	"Arial" | "TimesNewRoman" | "Papyrus" | "ComicSans" | "Impact" | "HelveticaNeue" | "Verdana" |
	"CenturyGothic" | "Georgia" | "CourierNew" | "Copperplate"
	;

type PreferenceSubscreenName =
	"General" | "Difficulty" | "Restriction" | "Chat" | "CensoredWords" | "Audio" | "Arousal" |
	"Security" | "Online" | "Visibility" | "Immersion" | "Graphics" | "Controller" | "Notifications" |
	"Gender" | "Scripts"
	;

type FetishName =
	"Bondage" | "Gagged" | "Blindness" | "Deafness" | "Chastity" | "Exhibitionist" | "Masochism" |
	"Sadism" | "Rope" | "Latex" | "Leather" | "Metal" | "Tape" | "Nylon" | "Lingerie" | "Pet" |
	"Pony" | "ABDL" | "Forniphilia"
	;

type BackgroundTag =
	"Filter by tag" | "Indoor" | "Outdoor" | "Aquatic" | "Special Events" | "SciFi & Fantasy" |
	"Club & College" | "Regular house" | "Dungeon" | "Asylum"
	;

// NOTE: `NPCArchetype` is for NPC's only
type TitleName =
	NPCArchetype | "None" | "Mistress" | "ClubSlave" | "Maid" | "HeadMaid" | "BondageMaid" | "Kidnapper" |
	"MasterKidnapper" | "Patient" | "PermanentPatient" | "EscapedPatient" | "Nurse" | "Doctor" |
	"LadyLuck" | "Patron" | "CollegeStudent" |"Nawashi" | "Houdini" | "PonyAlicorn" |
	"PonyPegasus" | "PonyUnicorn" | "PonyWild" | "PonyHot" | "PonyWarm" | "PonyCold" | "PonyFarm" |
	"PonyFoal" | "InfilrationMole" | "InfilrationInfiltrator" | "InfilrationAgent" |
	"InfilrationOperative" | "InfilrationSuperspy" | "MagicSchoolWizard" | "MagicSchoolMagus" |
	"MagicSchoolMagician" | "MagicSchoolSorcerer" | "MagicSchoolSage" | "MagicSchoolOracle" |
	"MagicSchoolWitch" | "MagicSchoolWarlock" | "Duchess" | "LittleOne" | "Baby" | "DL" |
	"BondageBaby" | "Switch" | "Kitten" | "Puppy" | "Foxy" | "Bunny" | "Doll" | "Demon" | "Angel" |
	"Succubus" | "GoodGirl" | "GoodSlaveGirl" | "GoodSlave" | "Drone"
	;

type MagicSchoolHouse = "Maiestas" | "Vincula" | "Amplector" | "Corporis";

type ModuleType = "Character" | "Cutscene" | "MiniGame" | "Online" | "Room";

type AssetCategory = "Medical" | "Extreme" | "Pony" | "SciFi" | "ABDL" | "Fantasy";

type PortalLinkStatus = "PortalLinkInvalidCode" | "PortalLinkClipboardError" | "PortalLinkValidCode" | `PortalLinkSearching${number}` | "PortalLinkDuplicateCode" | "PortalLinkTargetNotFound" | "PortalLinkEstablished";
type PortalLinkFunction = "PortalLinkFunctionLock" | "PortalLinkFunctionUnlock" | "PortalLinkFunctionCycleChastity" | `PortalLinkFunctionActivity${ActivityName}`;

//#endregion

//#region Server Messages

interface IChatRoomGameResponse {
	Data: {
		KinkyDungeon: string;
		OnlineBounty: {
			finishTime: number,
			target: number,
		};
		/* LARP */
		GameProgress?: "Start" | "Stop" | "Next" | "Skip" | "Action";
		Action?: undefined;
		Target?: number;
		Item?: string;

		/* MagicBattle */
		Spell?: number;
		Time?: number; /* ms */
	}
	Sender: number;
	RNG: number
}

//#endregion

//#region Server messages

interface IChatRoomSyncExpressionMessageBase<T extends ExpressionGroupName> {
	MemberNumber: number;
	Group: T;
	Name?: ExpressionNameMap[T];
}
type IChatRoomSyncExpressionMessageMap<T> = T extends ExpressionGroupName ? IChatRoomSyncExpressionMessageBase<T> : never;
type IChatRoomSyncExpressionMessage = IChatRoomSyncExpressionMessageMap<ExpressionGroupName>;

interface IChatRoomSyncPoseMessage {
	MemberNumber: number;
	Pose: AssetPoseName[];
}

interface IChatRoomSyncArousalMessage {
	MemberNumber: number;
	OrgasmTimer: number;
	OrgasmCount: number;
	Progress: number;
	ProgressTimer: number;
}
//#endregion

//#region Chat

type ChatRoomLovershipOption = "" | "CanOfferBeginWedding" | "CanBeginWedding";
type ChatRoomOwnershipOption = "" | "CanOfferEndTrial" | "CanOfferTrial" | "CanEndTrial";
type ChatRoomSpaceType = "X" | "" | "M" | "Asylum";
type ChatRoomGame = "" | "LARP" | "MagicBattle" | "GGTS";
type ChatRoomBlockCategory = AssetCategory | "Leashing" | "Photos" | "Arousal";
type ChatRoomLanguage = "EN" | "DE" | "FR" | "ES" | "CN" | "RU";

interface ChatRoom {
	Name: string;
	Description: string;
	Admin: number[];
	Ban: number[];
	Limit: number;
	Game: ChatRoomGame;
	Background: string;
	Private: boolean;
	Locked: boolean;
	BlockCategory: ChatRoomBlockCategory[];
	Language: ChatRoomLanguage;
	Character?: any[]; /* From server, not really a Character object */
}

type StimulationAction = "Kneel" | "Walk" | "Struggle" | "StruggleFail" | "Talk";

interface StimulationEvent {
	/** The chance that this event will trigger at 0 arousal */
	Chance: number;
	/** Scaling factor for chance, depending on the arousal */
	ArousalScaling?: number;
	/** Scaling factor for chance, depending on the vibe intensity */
	VibeScaling?: number;
	/** Scaling factor for chance, depending on the inflation amount */
	InflationScaling?: number;
	/** The chance that this event will trigger when talking */
	TalkChance?: number;
}

interface ChatRoomChatLogEntry {
	Chat: string;
	Garbled: string;
	Original: string;
	SenderName: string;
	SenderMemberNumber: number;
	Time: number;
}

type MessageActionType = "Action" | "Chat" | "Whisper" | "Emote" | "Activity" | "Hidden" |
	"LocalMessage" | "ServerMessage" | "Status";

type MessageContentType = string;

type CharacterReferenceTag =
	| "SourceCharacter"
	| "DestinationCharacter"
	| "DestinationCharacterName"
	| "TargetCharacter"
	| "TargetCharacterName"

type CommonChatTags =
	| CharacterReferenceTag
	| "AssetName"
	| "Automatic";

/**
 * A dictionary entry containing a replacement tag to be replaced by some value. The replacement strategy depends on
 * the type of dictionary entry.
 */
interface TaggedDictionaryEntry {
	/** The tag that will be replaced in the message */
	Tag: string;
}

/**
 * A dictionary entry used to reference a character. The character reference tag will be replaced with the provided
 * character's name or pronoun. The display format will depend on the tag chosen.
 * Example substitutions for each tag (assuming the character name is Ben987):
 * * SourceCharacter: "Ben987"
 * * DestinationCharacter: "Ben987's" (if character is not self), "her"/"him" (if character is self)
 * * DestinationCharacterName: "Ben987's"
 * * TargetCharacter: "Ben987" (if character is not self), "herself"/"himself" (if character is self)
 * * TargetCharacterName: "Ben987"
 * @deprecated Use {@link SourceCharacterDictionaryEntry} and {@link TargetCharacterDictionaryEntry} instead.
 */
interface CharacterReferenceDictionaryEntry extends TaggedDictionaryEntry {
	/** The member number of the referenced character */
	MemberNumber: number;
	/** The character reference tag, determining how the character's name or pronoun will be interpreted */
	Tag: CharacterReferenceTag;
	/**
	 * The nickname of the referenced character
	 * @deprecated Redundant information
	 */
	Text?: string;
}

/**
 * A dictionary entry used to indicate the source character of a chat message or action (i.e. the character initiating
 * the message or action).
 */
interface SourceCharacterDictionaryEntry {
	SourceCharacter: number;
}

/**
 * A dictionary entry used to indicate the target character of a chat message or action (i.e. the character that is
 * being acted upon as part of the message or action).
 */
interface TargetCharacterDictionaryEntry {
	TargetCharacter: number;
	Index?: number;
}

/**
 * A dictionary entry which indicates the focused group. This represents the group that was focused or interacted with
 * when sending a chat message. For example, if the message was caused by performing an activity or modifying an item
 * on the `ItemArms` group, then it would be appropriate to send this dictionary entry with `ItemArms` as the focus
 * group name.
 */
interface FocusGroupDictionaryEntry {
	/**
	 * The tag to be replaced - this is always FocusAssetGroup.
	 * @deprecated Redundant information.
	 */
	Tag?: "FocusAssetGroup";
	/** The group name representing focused group for the purposes of the sent message */
	FocusGroupName: AssetGroupItemName;
}

/**
 * A direct text substitution dictionary entry. Any occurrences of the given {@link Tag} string in the associated
 * message will be directly replaced with the {@link Text} from this dictionary entry (no text lookup will be done).
 * For example, given the message:
 * ```
 * Life is like a box of ConfectionaryName.
 * ```
 * and the {@link TextDictionaryEntry}:
 * ```js
 * {Tag: "ConfectionaryName", Text: "chocolates"}
 * ```
 * The resulting message would be:
 * ```
 * Life is like a box of chocolates.
 * ```
 */
interface TextDictionaryEntry extends TaggedDictionaryEntry {
	/** The text that will be substituted for the tag */
	Text: string;
}

/**
 * A text substitution dictionary entry with text lookup functionality. Any occurrences of the given {@link Tag} string
 * in the associated message will be replaced with the {@link Text} from the dictionary entry, but only after a text
 * lookup has been done on the {@link Text}, meaning that if the text has localisations, the localised version will be
 * used. The text will be looked up against `Dialog_Player.csv`.
 * For example, given the message:
 * ```
 * Hello, {GreetingObjectName}!
 * ```
 * And the {@link TextLookupDictionaryEntry}:
 * ```js
 * {Tag: "GreetingObjectName", TextToLookup: "WorldObject"}
 * ```
 * And the following in `Dialog_Player.csv`:
 * ```
 * WorldObject,,,World,,
 * ```
 * The text to lookup (`"WorldObject"`) would be looked up against `Dialog_Player.csv`, resolving to `"World"`. This
 * would then be used to replace the tag `"GreetingObjectName"` in the message, resulting in:
 * ```
 * Hello, World!
 * ```
 */
interface TextLookupDictionaryEntry extends TaggedDictionaryEntry {
	/** The text whose lookup will be substituted for the tag */
	TextToLookUp: string;
}

/**
 * A dictionary entry that references an asset group. Note that this is different from
 * {@link FocusGroupDictionaryEntry}, which denotes the group being acted on. A dictionary should only ever contain
 * one {@link FocusGroupDictionaryEntry}, whereas it may contain many {@link GroupReferenceDictionaryEntry}s. This
 * represents any group that might be referenced in the message, but is not necessarily the focused group.
 * For example, given the message:
 * ```
 * Use your BodyPart!
 * ```
 * And the {@link GroupReferenceDictionaryEntry}:
 * ```
 * {Tag: "BodyPart", GroupName: "ItemHands"}
 * ```
 * The name of the `"ItemHands"` group would be looked up, and this would be used to replace the `"BodyPart"` tag. The
 * resulting message would be:
 * ```
 * Use your Hands!
 * ```
 */
interface GroupReferenceDictionaryEntry extends TaggedDictionaryEntry {
	/** The name of the asset group to reference */
	GroupName: AssetGroupName;
}

/**
 * A dictionary entry that references an asset. Note that a dictionary may contain multiple of these entries, one for
 * each asset mentioned or referenced in the message. For example, a message when swapping two restraints might contain
 * two of these entries, one for the restraint being removed, and one for the restraint being added.
 */
interface AssetReferenceDictionaryEntry extends GroupReferenceDictionaryEntry {
	/** The name of the asset being referenced */
	AssetName: string;
}

/**
 * A special instance of an {@link AssetReferenceDictionaryEntry} which indicates that this asset was used to carry
 * out an activity.
 */
interface ActivityAssetReferenceDictionaryEntry extends AssetReferenceDictionaryEntry {
	Tag: "ActivityAsset";
}

/**
 * A metadata dictionary entry sent with a shock event message including a shock intensity representing the strength
 * of the shock. This is used to determine the severity of any visual or gameplay effects the shock may have.
 */
interface ShockEventDictionaryEntry {
	/** The intensity of the shock - must be a non-negative number */
	ShockIntensity: number;
}

/**
 * A metadata dictionary entry indicating that the message has been generated due to an automated event. Can be used
 * to filter out what might otherwise be spammy chat messages (these include things like automatic vibrator intensity
 * changes and events & messages triggered by some futuristic items).
 */
interface AutomaticEventDictionaryEntry {
	/** Indicates that this message was triggered by an automatic event */
	Automatic: true;
}

/**
 * A metadata dictionary entry carrying a numeric counter for an associated event or activity. Currently only used by
 * the Anal Beads XL to indicate how many beads were inserted.
 */
interface ActivityCounterDictionaryEntry {
	/** Counter metadata to be sent with a message */
	ActivityCounter: number;
}

/**
 * A dictionary entry for group lookup & replacement. Used ambiguously for both {@link FocusGroupDictionaryEntry} and
 * {@link GroupReferenceDictionaryEntry}. This dictionary entry type is deprecated, and one of the aforementioned entry
 * types should be used instead.
 * @deprecated Use {@link FocusGroupDictionaryEntry}/{@link GroupReferenceDictionaryEntry}
 */
interface AssetGroupNameDictionaryEntry {
	Tag?: "FocusAssetGroup";
	AssetGroupName: AssetGroupItemName;
}

/**
 * A dictionary entry indicating the name of an activity. Sent with chat messages to indicate that an activity was
 * carried out as part of the message.
 */
interface ActivityNameDictionaryEntry {
	/** The name of the activity carried out */
	ActivityName: ActivityName;
}

type ChatMessageDictionaryEntry =
	| CharacterReferenceDictionaryEntry
	| SourceCharacterDictionaryEntry
	| TargetCharacterDictionaryEntry
	| FocusGroupDictionaryEntry
	| TextDictionaryEntry
	| TextLookupDictionaryEntry
	| GroupReferenceDictionaryEntry
	| AssetReferenceDictionaryEntry
	| ActivityAssetReferenceDictionaryEntry
	| ShockEventDictionaryEntry
	| AutomaticEventDictionaryEntry
	| ActivityCounterDictionaryEntry
	| AssetGroupNameDictionaryEntry
	| ActivityNameDictionaryEntry;

type ChatMessageDictionary = ChatMessageDictionaryEntry[];

interface IChatRoomMessageBasic {
	Content: MessageContentType;
	Sender: number;
	// SourceMemberNumber: number;
}

interface IChatRoomMessage extends IChatRoomMessageBasic {
	Type: MessageActionType;
	Dictionary?: ChatMessageDictionary;
	Timeout?: number;
}

interface IChatRoomSyncBasic {
	SourceMemberNumber: number
}

interface IChatRoomSyncMessage extends IChatRoomSyncBasic, ChatRoom { }

interface IChatRoomMessageMetadata {
	/** The name of the sender character, appropriately garbled if deafened */
	senderName?: string;
	/** The character targetted by the message */
	TargetCharacter?: Character;
	AdditionalTargets?: Record<number, Character>;
	/** The character sending the message */
	SourceCharacter?: Character;
	/** The member number of the target */
	TargetMemberNumber?: number;
	/** Whether the message is considered game-initiated. Used for automatic vibe changes for example. */
	Automatic?: boolean;
	/** The group that has been interacted with to trigger the message */
	FocusGroup?: AssetItemGroup;
	/** The name of the group that has been interacted with to trigger the message */
	GroupName?: AssetGroupName;
	/** The assets referenced in the message */
	Assets?: Record<string, Asset>;
	/** The groups referenced in the message */
	Groups?: Partial<Record<AssetGroupName, AssetGroup>>;
	/** How intense the shock should be */
	ShockIntensity?: number;
	ActivityCounter?: number;
	/** The triggered activity */
	ActivityName?: ActivityName;
	/** The name of the asset used for the activity */
	ActivityAsset?: Asset;
	/** The name of the chatroom, appropriately garbled */
	ChatRoomName?: string;
}

/**
 * A metadata extractor for a given message.
 *
 * @param data - The chat message to extract from.
 * @param sender - The character that sent the message.
 * @return An object with the following keys:
 *  - `metadata`: an object for the extracted metadata (key/value)
 *  - `substitutions`: an array of [tag, substitutions] to perform on the message.
 * @return null if the extraction has nothing to report.
 */
type ChatRoomMessageExtractor =
	(data: IChatRoomMessage, sender: Character) => { metadata: IChatRoomMessageMetadata, substitutions: CommonSubtituteSubstitution[] } | null;

/**
 * A chat message handler.
 *
 * This is used in ChatRoomMessage to perform filtering and actions on
 * the recieved message. You can register one of those with
 * ChatRoomRegisterMessageHandler if you need to peek at incoming messages.
 *
 * Message processing is done in three phases:
 * - all pre-handlers are called
 * - metadata extraction & tag substitutions are collected
 *   from the message's dictionary, then latter are applied to
 *   the message's contents.
 * - finally, post-handlers are called.
 *
 * The handler's priority determines when the handler will get executed:
 * - Negative values make the handler run before metadata extraction
 * - Positive values make it run afterward.
 * In both cases, lower values mean higher priority, so -100 handler will
 * run before a -1, and a 1 handler will run before a 100.
 *
 * The return from the callback determines what will happen: if it's true,
 * message processing will stop, making the filter act like a handler.
 * If it's false, then it will continue. You can also return an object with
 * a `msg` property if the handler is a transformation and wishes to update
 * the message's contents inflight and/or a `skip` property if you'd like
 * to cause a subsequent handler to not be called.
 *
 * @warning Note that the in-flight message is only escaped when it gets
 * sent to the chat log via ChatRoomMessageDisplay. If you're manipulating
 * that by any other means, make sure to call ChatRoomEscapeEntities on its
 * content to close any injection attacks.
 *
 * A few notable priority values are:
 *
 * -200: ghosted player cutoff
 * -1: default Hidden message processing (and cutoff)
 * 0: emotes reformatting
 * 100: sensory-deprivation processing
 * 200: automatic actions on others' cutoff
 * 300: sensory-deprivation cutoff.
 * 500: usually output handlers. That's when audio, notifications and the
 *      message being added to the chat happens.
 *
 * Hidden messages never make it to post-processing.
 *
 */
interface ChatRoomMessageHandler {
	/** A short description of what the handler does. For debugging purposes */
	Description?: string;

	/**
	 * This handler's priority, used to determine when the code should run.
	 */
	Priority: number;

	/**
	 * Actual action to perform.
	 * @param data - The chat message to handle.
	 * @param sender - The character that sent the message.
	 * @param msg - The formatted string extracted from the message.
	 *              If the handler is in "post" mode, all substitutions have been performed.
	 * @param metadata - The collected metadata from the message's dictionary, only available in "post" mode.
	 * @returns {boolean} true if the message was handled and the processing should stop, false otherwise.
	 */
	Callback: (data: IChatRoomMessage, sender: Character, msg: string, metadata?: IChatRoomMessageMetadata) => boolean | { msg?: string; skip?: (handler: ChatRoomMessageHandler) => boolean };
}

//#endregion

//#region FriendList

interface IFriendListBeepLogMessage {
	MemberNumber?: number; /* undefined for NPCs */
	MemberName: string;
	ChatRoomName?: string;
	Private: boolean;
	ChatRoomSpace?: string;
	Sent: boolean;
	Time: Date;
	Message?: string;
}

//#endregion

//#region Assets

type IAssetFamily = "Female3DCG";

interface AssetGroup {
	Family: IAssetFamily;
	Name: AssetGroupName;
	Description: string;
	Asset: readonly Asset[];
	ParentGroupName: AssetGroupName | "";
	Category: 'Appearance' | 'Item' | 'Script';
	IsDefault: boolean;
	IsRestraint: boolean;
	AllowNone: boolean;
	AllowColorize: boolean;
	AllowCustomize: boolean;
	Random?: boolean;
	ColorSchema: readonly string[];
	ParentSize: AssetGroupName | "";
	ParentColor: AssetGroupName | "";
	Clothing: boolean;
	Underwear: boolean;
	BodyCosplay: boolean;
	Hide?: readonly AssetGroupName[];
	Block?: readonly AssetGroupItemName[];
	Zone?: readonly [number, number, number, number][];
	SetPose?: readonly AssetPoseName[];
	AllowPose: readonly AssetPoseName[];
	AllowExpression?: readonly ExpressionName[];
	Effect?: readonly EffectName[];
	MirrorGroup: AssetGroupName | "";
	RemoveItemOnRemove: readonly { Group: AssetGroupItemName; Name: string; Type?: string }[];
	DrawingPriority: number;
	DrawingLeft: number;
	DrawingTop: number;
	DrawingFullAlpha: boolean;
	DrawingBlink: boolean;
	InheritColor: AssetGroupName | null;
	FreezeActivePose: readonly AssetPoseCategory[];
	PreviewZone?: RectTuple;
	DynamicGroupName: AssetGroupName;
	MirrorActivitiesFrom?: AssetGroupItemName;

	/** A dict mapping colors to custom filename suffices.
	The "HEX_COLOR" key is special-cased to apply to all color hex codes. */
	ColorSuffix?: Record<string, string>;
	ExpressionPrerequisite?: readonly AssetPrerequisite[];
	HasPreviewImages: boolean;
	/** Return whether this group belongs to the `Appearance` {@link AssetGroup.Category} */
	IsAppearance(): this is AssetAppearanceGroup;
	/** Return whether this group belongs to the `Item` {@link AssetGroup.Category} */
	IsItem(): this is AssetItemGroup;
	/** Return whether this group belongs to the `Script` {@link AssetGroup.Category} */
	IsScript(): this is AssetScriptGroup;
}

/** An AssetGroup subtype for the `Appearance` {@link AssetGroup.Category} */
interface AssetAppearanceGroup extends AssetGroup {
	Category: "Appearance";
	Name: AssetGroupBodyName;
	IsRestraint: false;
	AllowExpression?: readonly ExpressionName[];
}

/** An AssetGroup subtype for the `Item` {@link AssetGroup.Category} */
interface AssetItemGroup extends AssetGroup {
	Category: "Item";
	Name: AssetGroupItemName;
	Underwear: false;
	BodyCosplay: false;
	Clothing: false;
	IsDefault: false;
	AllowExpression?: undefined;
	Zone: readonly [number, number, number, number][];
}

/** An AssetGroup subtype for the `Script` {@link AssetGroup.Category} */
interface AssetScriptGroup extends AssetGroup {
	Category: "Script";
	Name: AssetGroupScriptName;
	IsRestraint: false;
	BodyCosplay: false;
	Underwear: false;
	Clothing: false;
	IsDefault: false;
	AllowExpression?: undefined;
}

/** Mapped type for mapping group names to their respective {@link AssetGroup} subtype */
type AssetGroupMap = (
	{[k in AssetGroupBodyName]: AssetAppearanceGroup}
	& {[k in AssetGroupItemName]: AssetItemGroup}
	& {[k in AssetGroupScriptName]: AssetScriptGroup}
);

/** An object defining a drawable layer of an asset */
interface AssetLayer {
	/** The name of the layer - may be null if the asset only contains a single default layer */
	Name: string | null;
	/** whether or not this layer can be colored */
	AllowColorize: boolean;
	/** if not null, specifies that this layer should always copy the color of the named layer */
	CopyLayerColor: string | null;
	/** specifies the name of a color group that this layer belongs to. Any layers within the same color group can be colored together via the item color UI */
	ColorGroup: string | null;
	/** whether or not this layer can be colored in the coloring UI */
	HideColoring: boolean;
	/** A list of allowed extended item types that this layer permits - the layer will only be drawn if
	the item type matches one of these types. If null, the layer is considered to permit all extended types. */
	AllowTypes: readonly string[] | null;
	/** whether or not the layer has separate assets per type. If not, the extended type will not be included in
	the URL when fetching the layer's image */
	HasType: boolean;
	/** The name of the parent group for this layer. If null, the layer has no parent group. If
	undefined, the layer inherits its parent group from it's asset/group. */
	ParentGroupName?: AssetGroupName | "" | null;
	/** An array of poses that this layer permits. If set, it will override the poses permitted
	by the parent asset/group. */
	AllowPose: readonly AssetPoseName[] | null;
	/** An array of poses that this layer should be hidden for. */
	HideForPose: readonly (AssetPoseName | "")[];
	/** An array of objects mapping poses to other poses to determine their draw folder */
	PoseMapping?: AssetPoseMapping;
	/** The drawing priority of this layer. Inherited from the parent asset/group if not specified in the layer
	definition. */
	Priority: number;
	InheritColor: AssetGroupName | null;
	Alpha: readonly AlphaDefinition[];
	/** The asset that this layer belongs to */
	Asset: Asset;
	DrawingLeft?: number;
	DrawingTop?: number;
	HideAs?: { Group: AssetGroupName; Asset?: string };
	/** That layer is drawing at a fixed Y position */
	FixedPosition?: boolean;
	HasImage: boolean;
	Opacity: number;
	MinOpacity: number;
	MaxOpacity: number;
	BlendingMode: GlobalCompositeOperation;
	LockLayer: boolean;
	MirrorExpression?: AssetGroupName;
	AllowModuleTypes?: readonly string[];
	/** The coloring index for this layer */
	ColorIndex: number;
	/** Any group-specific alpha masks that should be applied when drawing the layer. Only available on layers that have
	been created prior to drawing */
	GroupAlpha?: AlphaDefinition[];
	/** A module for which the layer can have types. */
	ModuleType: readonly string[] | null;
	/* Specifies that this layer should not be drawn if the character is wearing any item with the given attributes */
	HideForAttribute: readonly AssetAttribute[] | null;
	/* Specifies that this layer should not be drawn unless the character is wearing an item with one of the given attributes */
	ShowForAttribute: readonly AssetAttribute[] | null;
	/** Used along with a hook to make layers of an asset disappear in some cases. */
	Visibility: "Player" | "AllExceptPlayerDialog" | "Others" | "OthersExceptDialog" | "Owner" | "Lovers" | "Mistresses" | null;
}

/** An object defining a group of alpha masks to be applied when drawing an asset layer */
interface AlphaDefinition {
	/** A list of the group names that the given alpha masks should be applied to. If empty or not present, the
alpha masks will be applied to every layer underneath the present one. */
	Group?: AssetGroupName[];
	/** A list of the poses that the given alpha masks should be applied to. If empty or not present, the alpha
masks will be applied regardless of character pose. */
	Pose?: AssetPoseName[];
	/** A list of the extended types that the given alpha masks should be applied to. If empty or not present, the alpha
masks will be applied regardless of the extended type. */
	Type?: string[];
	/** A list of alpha mask definitions. A definition is a 4-tuple of numbers defining the top left coordinate of
a rectangle and the rectangle's width and height - e.g. [left, top, width, height] */
	Masks: RectTuple[];
}

interface TintDefinition {
	Color: number | string;
	Strength: number;
	DefaultColor?: string;
}

interface ResolvedTintDefinition extends TintDefinition {
	Item: Item;
}

interface ExpressionTriggerBase<GroupName extends ExpressionGroupName> {
	Group: GroupName;
	Name: null | ExpressionNameMap[GroupName];
	Timer: number;
}
type ExpressionTriggerMap<T> = T extends ExpressionGroupName ? ExpressionTriggerBase<T> : never;
type ExpressionTrigger = ExpressionTriggerMap<ExpressionGroupName>;

interface ExpressionItem {
	Appearance: Item,
	Group: ExpressionGroupName,
	CurrentExpression: null | ExpressionName,
	ExpressionList: ExpressionName[],
}

/**
 * The internal Asset definition of an asset.
 *
 * See AssetDefinition in Female3DCG.d.ts for documentation.
 */
interface Asset {
	Name: string;
	Description: string;
	Group: AssetGroup;
	ParentItem?: string;
	ParentGroupName?: AssetGroupName | null;
	Enable: boolean;
	Visible: boolean;
	NotVisibleOnScreen?: readonly string[];
	Wear: boolean;
	Activity: ActivityName | null;
	AllowActivity?: readonly ActivityName[];
	ActivityAudio?: readonly string[];
	ActivityExpression: Partial<Record<ActivityName, readonly ExpressionTrigger[]>>;
	AllowActivityOn?: readonly AssetGroupItemName[];
	BuyGroup?: string;
	PrerequisiteBuyGroups?: readonly string[];
	Effect?: readonly EffectName[];
	Bonus?: AssetBonusName;
	Block?: readonly AssetGroupItemName[];
	Expose: readonly AssetGroupItemName[];
	Hide?: readonly AssetGroupName[];
	HideItem?: readonly string[];
	HideItemExclude: readonly string[];
	HideItemAttribute: readonly AssetAttribute[];
	Require: readonly AssetGroupBodyName[];
	SetPose?: readonly AssetPoseName[];
	AllowPose: readonly AssetPoseName[] | null;
	HideForPose: readonly (AssetPoseName | "")[];
	PoseMapping?: AssetPoseMapping;
	AllowActivePose?: readonly AssetPoseName[];
	WhitelistActivePose?: readonly AssetPoseName[];
	Value: number;
	Difficulty: number;
	SelfBondage: number;
	SelfUnlock: boolean;
	ExclusiveUnlock: boolean;
	Random: boolean;
	RemoveAtLogin: boolean;
	WearTime: number;
	RemoveTime: number;
	RemoveTimer: number;
	MaxTimer: number;
	DrawingPriority?: number;
	DrawingLeft?: number;
	DrawingTop?: number;
	HeightModifier: number;
	ZoomModifier: number;
	Alpha?: readonly AlphaDefinition[];
	Prerequisite: readonly AssetPrerequisite[];
	Extended: boolean;
	AlwaysExtend: boolean;
	AlwaysInteract: boolean;
	AllowLock: boolean;
	LayerVisibility: boolean;
	IsLock: boolean;
	PickDifficulty: number;
	OwnerOnly: boolean;
	LoverOnly: boolean;
	FamilyOnly: boolean;
	ExpressionTrigger?: readonly ExpressionTrigger[];
	RemoveItemOnRemove: readonly { Name: string; Group: AssetGroupName; Type?: string; }[];
	AllowEffect?: readonly EffectName[];
	AllowBlock?: readonly AssetGroupItemName[];
	AllowHide?: readonly AssetGroupName[];
	AllowHideItem?: readonly string[];
	AllowType?: readonly string[];
	AllowTighten?: boolean;
	/**
	 * The default color of the item: an array of length {@link Asset.ColorableLayerCount} consisting of `"Default"` and/or valid color hex codes.
	 */
	DefaultColor: readonly string[];
	Opacity: number;
	MinOpacity: number;
	MaxOpacity: number;
	Audio?: string;
	Category?: readonly AssetCategory[];
	Fetish?: readonly FetishName[];
	CustomBlindBackground?: string;
	ArousalZone: AssetGroupItemName;
	IsRestraint: boolean;
	BodyCosplay: boolean;
	OverrideBlinking: boolean;
	DialogSortOverride?: DialogSortOrder;
	DynamicDescription: (C: Character) => string;
	DynamicPreviewImage: (C: Character) => string;
	DynamicAllowInventoryAdd: (C: Character) => boolean;
	DynamicName: (C: Character) => string;
	DynamicGroupName: AssetGroupName;
	DynamicActivity: (C: Character) => ActivityName | null | undefined;
	DynamicAudio: ((C: Character) => string) | null;
	CharacterRestricted: boolean;
	AllowRemoveExclusive: boolean;
	InheritColor?: AssetGroupName;
	DynamicBeforeDraw: boolean;
	DynamicAfterDraw: boolean;
	DynamicScriptDraw: boolean;
	HasType: boolean;
	AllowLockType?: readonly string[];
	AllowColorizeAll: boolean;
	AvailableLocations: readonly string[];
	OverrideHeight?: AssetOverrideHeight;
	FreezeActivePose: readonly AssetPoseCategory[];
	DrawLocks: boolean;
	AllowExpression?: readonly ExpressionName[];
	MirrorExpression?: AssetGroupBodyName;
	FixedPosition: boolean;
	Layer: readonly AssetLayer[];
	/** The number of colorable layers. Guaranteed to be >= 1 */
	ColorableLayerCount: number;
	Archetype?: ExtendedArchetype;
	Attribute: readonly AssetAttribute[];
	PreviewIcons: readonly InventoryIcon[];
	Tint: readonly TintDefinition[];
	AllowTint: boolean;
	DefaultTint?: string;
	Gender?: 'F' | 'M';
	CraftGroup: string;
	ColorSuffix: Record<string, string>;
	ExpressionPrerequisite?: readonly AssetPrerequisite[];
}

//#endregion

/** An ItemBundle is a minified version of the normal Item */
interface ItemBundle {
	Group: AssetGroupName;
	Name: string;
	Difficulty?: number;
	Color?: ItemColor;
	Property?: ItemProperties;
	Craft?: CraftingItem;
}

/** An AppearanceBundle is whole minified appearance of a character */
type AppearanceBundle = ItemBundle[];

interface Pose {
	Name: AssetPoseName;
	Category?: AssetPoseCategory;
	AllowMenu?: true;
	/** Only show in menu if an asset supports it */
	AllowMenuTransient?: true;
	OverrideHeight?: AssetOverrideHeight;
	Hide?: AssetGroupName[];
	MovePosition?: { Group: AssetGroupName; X: number; Y: number; }[];
}

type ActivityNameBasic = "Bite" | "Caress" | "Choke" | "Cuddle" | "FrenchKiss" |
	"GagKiss" | "GaggedKiss" | "Grope" | "HandGag" | "Kick" |
	"Kiss" | "Lick" | "MassageFeet" | "MassageHands" | "MasturbateFist" |
	"MasturbateFoot" |"MasturbateHand" | "MasturbateTongue" |
	"MoanGag" | "MoanGagAngry" | "MoanGagGiggle" | "MoanGagGroan" | "MoanGagTalk" |
	"MoanGagWhimper" | "Nibble" | "Nod" | "PenetrateFast" |
	"PenetrateSlow" | "Pet" | "Pinch" | "PoliteKiss" | "Pull" |
	"RestHead" | "Rub" | "Sit" | "Slap" | "Spank" | "Step" | "StruggleArms" | "StruggleLegs" |
	"Suck" | "TakeCare" | "Tickle" | "Whisper" | "Wiggle" |
	"SistersHug" | "BrothersHandshake" | "SiblingsCheekKiss"
;

type ActivityNameItem = "Inject" | "MasturbateItem" | "PenetrateItem" | "PourItem" | "RollItem" | "RubItem" | "ShockItem" | "SipItem" | "SpankItem" | "TickleItem";

type ActivityName = ActivityNameBasic | ActivityNameItem;

type ActivityPrerequisite =
	"AssEmpty" | "CantUseArms" | "CantUseFeet" | "CanUsePenis" | "CanUseTongue" | "HasVagina" | "IsGagged" | "MoveHead" |
	`Needs-${ActivityNameItem}` |
	"TargetCanUseTongue" | "TargetKneeling" | "TargetMouthBlocked" | "TargetMouthOpen" | "TargetZoneAccessible" | "TargetZoneNaked" |
	"UseArms" | "UseFeet" | "UseHands" | "UseMouth" | "UseTongue" | "VulvaEmpty" | "ZoneAccessible" | "ZoneNaked" |
	"Sisters" | "Brothers" | "SiblingsWithDifferentGender"
;

interface Activity {
	Name: ActivityName;
	MaxProgress: number;
	MaxProgressSelf?: number;
	Prerequisite: ActivityPrerequisite[];
	Target: AssetGroupItemName[];
	TargetSelf?: AssetGroupItemName[] | true;
	/** Whether to reverse the prerequisite checks for that one */
	Reverse?: true;
	/** used for setting {@link ExtendedItemAutoPunishHandled} */
	MakeSound?: boolean;
	/** An action that trigger when that activity is used */
	StimulationAction?: StimulationAction;
	/** The default expression for that activity. Can be overriden using ActivityExpression on the asset */
	ActivityExpression?: ExpressionTrigger[];
}

type ItemActivityRestriction = "blocked" | "limited" | "unavail";

interface ItemActivity {
	/** The activity performed */
	Activity: Activity;
	/** An optional item used for the activity. Null if the player is used their hand, for example. */
	Item?: Item;
	/** Whether the item is blocked or limited on the target character, or unavailable because the player is blocked. Undefined means no restriction. */
	Blocked?: ItemActivityRestriction;
}

type ItemColor = string | string[];

/** An item is a pair of asset and its dynamic properties that define a worn asset. */
interface Item {
	Asset: Asset;
	Color?: ItemColor;
	Difficulty?: number;
	Craft?: CraftingItem;
	Property?: ItemProperties;
}

type FavoriteIcon = "Favorite" | "FavoriteBoth" | "FavoritePlayer";
type ItemEffectIcon = "BlindLight" | "BlindNormal" | "BlindHeavy" | "DeafLight" | "DeafNormal" | "DeafHeavy" | "GagLight" | "GagNormal" | "GagHeavy" | "GagTotal";
type InventoryIcon = FavoriteIcon | ItemEffectIcon | "AllowedLimited" | "Handheld" | "Locked" | "LoverOnly" | "FamilyOnly" | "OwnerOnly" | "Unlocked" | AssetLockType;

interface InventoryItem {
	Group: AssetGroupName;
	Name: string;
	Asset: Asset;
}

type SkillType = "Bondage" | "SelfBondage" | "LockPicking" | "Evasion" | "Willpower" | "Infiltration" | "Dressage";

interface Skill {
	Type: SkillType;
	Level: number;
	Progress: number;
	Ratio?: number;
}

type ReputationType =
	"Dominant" | "Kidnap" | "ABDL" | "Gaming" | "Maid" | "LARP" | "Asylum" | "Gambling" |
	"HouseMaiestas" | "HouseVincula" | "HouseAmplector" | "HouseCorporis";

interface Reputation {
	Type: ReputationType;
	Value: number;
}

interface Ownership {
	Name: string;
	MemberNumber: number;
	Stage: 0 | 1;
	Start: number;
}

interface Lovership {
	Name: string;
	MemberNumber?: number;
	Stage?: 0 | 1 | 2;
	Start?: number;
	// Bad data sometimes received from server
	BeginDatingOfferedByMemberNumber?: unknown;
	BeginEngagementOfferedByMemberNumber?: unknown;
	BeginWeddingOfferedByMemberNumber?: unknown;
}

interface ScreenFunctions {
	// Required
	/**
	 * Called each frame
	 * @param {number} time - The current time for frame
	 */
	Run(time: number): void;
	/**
	 * Called when user clicks on the canvas
	 * @param {MouseEvent | TouchEvent} event - The event that triggered this
	 */
	Click(event: MouseEvent | TouchEvent): void;

	// Optional
	/** Called when screen is loaded using `CommonSetScreen` */
	Load?(): void;
	/** Called when this screen is being replaced */
	Unload?(): void;
	/**
	 * Called when screen size or position changes or after screen load
	 * @param {boolean} load - If the reason for call was load (`true`) or window resize (`false`)
	 */
	Resize?(load: boolean): void;
	/**
	 * Called when user presses any key
	 * @param {KeyboardEvent} event - The event that triggered this
	 */
	KeyDown?(event: KeyboardEvent): void;
	/** Called when user presses Esc */
	Exit?(): void;
}

//#region Characters

/** A struct for representing an item with special permissions (limited, favorited, etc). */
interface ItemPermissions {
	/** The {@link Asset.Name} of the item */
	Name: string;
	/** The {@link AssetGroup.Name} of the item */
	Group: AssetGroupName;
	/**
	 * Either the item's {@link ItemProperties.Type} or, in the case of modular items,
	 * a substring thereof denoting the type of a single module
	 */
	Type?: string | null;
}

interface ScriptPermission {
	permission: number;
}

type ScriptPermissionProperty = "Hide" | "Block";

type ScriptPermissionLevel = "Self" | "Owner" | "Lovers" | "Friends" | "Whitelist" | "Public";

type ScriptPermissions = Record<ScriptPermissionProperty, ScriptPermission>;

interface DialogLine {
	Stage: string;
	NextStage: string;
	Option: string;
	Result: string;
	Function: string;
	Prerequisite: string;
	Group: string;
	Trait: string;
}

interface Character {
	ID: number;
	/** Only on `Player` */
	OnlineID?: string;
	Type: CharacterType;
	Name: string;
	Nickname?: string;
	AssetFamily: IAssetFamily;
	AccountName: string;
	Owner: string;
	Lover: string;
	Money: number;
	Inventory: InventoryItem[];
	Appearance: Item[];
	Stage: string;
	CurrentDialog: string;
	Dialog: DialogLine[];
	Reputation: Reputation[];
	Skill: Skill[];
	Pose: AssetPoseName[];
	ActivePose: AssetPoseName[];
	AllowedActivePose: AssetPoseName[];
	Effect: EffectName[];
	Tints: ResolvedTintDefinition[];
	Attribute: AssetAttribute[];
	FocusGroup: AssetItemGroup | null;
	Canvas: HTMLCanvasElement | null;
	CanvasBlink: HTMLCanvasElement | null;
	MustDraw: boolean;
	BlinkFactor: number;
	AllowItem: boolean;
	BlockItems: ItemPermissions[];
	FavoriteItems: ItemPermissions[];
	LimitedItems: ItemPermissions[];
	WhiteList: number[];
	HeightModifier: number;
	MemberNumber?: number;
	ItemPermission?: 0 | 1 | 2 | 3 | 4 | 5;
	Ownership?: Ownership;
	Lovership?: Lovership[];
	CanTalk: () => boolean;
	CanWalk: () => boolean;
	CanKneel: () => boolean;
	CanInteract: () => boolean;

	/**
	 * Check whether a character can change its own outfit.
	 *
	 * @warning Only usable on Player
	 * @returns {boolean} - TRUE if changing is possible, FALSE otherwise.
	 */
	CanChangeOwnClothes: () => boolean;

	/**
	 * Check whether a character can change another one's outfit.
	 *
	 * @param {Character} C - The character to check against.
	 * @returns {boolean} - TRUE if changing is possible, FALSE otherwise.
	 */
	CanChangeClothesOn: (C: Character) => boolean;
	IsProne: () => boolean;
	IsRestrained: () => boolean;
	IsBlind: () => boolean;
	IsEnclose: () => boolean;
	IsChaste: () => boolean;
	IsVulvaChaste: () => boolean;
	IsBreastChaste: () => boolean;
	IsButtChaste: () => boolean;
	IsEgged: () => boolean;
	IsOwned: () => boolean;
	IsOwnedByPlayer: () => boolean;
	IsOwner: () => boolean;
	IsKneeling: () => boolean;
	IsNaked: () => boolean;
	IsDeaf: () => boolean;
	IsGagged: () => boolean;
	HasNoItem: () => boolean;
	IsLoverOfPlayer: () => boolean;
	GetLoversNumbers: (MembersOnly?: boolean) => (number | string)[];
	HiddenItems: ItemPermissions[];
	HeightRatio: number;
	HasHiddenItems: boolean;
	SavedColors: HSVColor[];
	GetBlindLevel: (eyesOnly?: boolean) => number;
	GetBlurLevel: () => number;
	IsLocked: () => boolean;
	IsMounted: () => boolean;
	IsPlugged: () => boolean;
	IsShackled: () => boolean;
	IsSlow: () => boolean;
	IsMouthBlocked: () => boolean;
	IsMouthOpen: () => boolean;
	IsVulvaFull: () => boolean;
	IsAssFull: () => boolean;
	IsFixedHead: () => boolean;
	IsOwnedByMemberNumber: (memberNumber: number) => boolean;
	IsLover: (C: Character) => boolean;
	IsLoverOfMemberNumber: (memberNumber: number) => boolean;
	GetDeafLevel: () => number;
	IsLoverPrivate: () => boolean;
	IsEdged: () => boolean;
	IsPlayer: () => this is PlayerCharacter;
	IsBirthday: () => boolean;
	IsFamilyOfPlayer: () => boolean;
	IsInFamilyOfMemberNumber: (MemberNum: number) => boolean;
	IsOnline: () => boolean;
	IsNpc: () => this is NPCCharacter;
	IsSimple: () => boolean;
	GetDifficulty: () => number;
	IsSuspended: () => boolean;
	IsInverted: () => boolean;
	CanChangeToPose: (Pose: AssetPoseName) => boolean;
	GetClumsiness: () => number;
	HasEffect: (Effect: EffectName) => boolean;
	HasTints: () => boolean;
	GetTints: () => RGBAColor[];
	HasAttribute: (attribute: AssetAttribute) => boolean;
	DrawPose?: AssetPoseName[];
	DrawAppearance?: Item[];
	AppearanceLayers?: AssetLayer[];
	Hooks: Map<CharacterHook, Map<string, () => void>> | null;
	RegisterHook: (hookName: CharacterHook, hookInstance: string, callback: () => void) => boolean;
	UnregisterHook: (hookName: CharacterHook, hookInstance: string) => boolean;
	RunHooks: (hookName: CharacterHook) => void;
	HeightRatioProportion?: number;
	GetGenders: () => ("M" | "F")[];
	HasPenis: () => boolean;
	HasVagina: () => boolean;
	IsFlatChested: () => boolean;
	// Properties created in other places
	ArousalSettings?: ArousalSettingsType;
	AppearanceFull?: Item[];
	// Online character properties
	Title?: TitleName;
	LabelColor?: string;
	Creation?: number;
	Description?: string;
	OnlineSharedSettings?: CharacterOnlineSharedSettings;
	Game?: {
		LARP?: GameLARPParameters,
		MagicBattle?: GameMagicBattleParameters,
		GGTS?: GameGGTSParameters,
		Poker?: GamePokerParameters,
		ClubCard?: GameClubCardParameters,
	};
	BlackList: number[];
	RunScripts?: boolean;
	HasScriptedAssets?: boolean;
	Cage?: true | null;
	Difficulty?: {
		Level: number;
		LastChange?: number;
	};
	ArousalZoom?: boolean;
	FixedImage?: string;
	Rule?: LogRecord[];
	Status?: string | null;
	StatusTimer?: number;
	Crafting?: (null | CraftingItem)[];
}

/**
 * The characters online shared settings.
 * @see {@link Character.OnlineSharedSettings}
 */
interface CharacterOnlineSharedSettings {
	AllowFullWardrobeAccess: boolean;
	BlockBodyCosplay: boolean;
	AllowPlayerLeashing: boolean;
	DisablePickingLocksOnSelf: boolean;
	GameVersion: string;
	ItemsAffectExpressions: boolean;
	ScriptPermissions: ScriptPermissions;
	WheelFortune: string;
}

type NPCArchetype =
	/* Pandora NPCs */
	"MemberNew"|"MemberOld"|"Cosplay"|"Mistress"|"Slave"|"Maid"|"Guard"|
	/* Pandora Special */
	"Victim"|"Target"|"Chest"|
	// Misc
	"Dominatrix" | "Nurse" | "Submissive" | "Mistress" | "Patient" | "Maid" | "Mistress" | "Maiestas" | "Vincula" | "Amplector" | "Corporis"
	;

/** NPC Character extension */
// FIXME: That one should find its way down to NPCCharacter, but
// there's too many accesses to those properties from Character
// to do so.
interface Character {
	/** NPC type: Slave, Maid, etc. */
	Archetype?: NPCArchetype;
	Love?: number; /** The NPC's love value */
	WillRelease?(): boolean; /** Shop NPC-only: will it release the player when asked */
}

/** NPC-only */
interface NPCCharacter extends Character {
	Archetype?: NPCArchetype;
	Trait?: NPCTrait[];
	Event?: NPCTrait[];
	Affection?: number;
	Domination?: number;
}

/** College */
interface NPCCharacter {
	GoneAway?: boolean;
}

/** Asylum */
interface NPCCharacter {
	RunAway?: boolean;
}

/** Movie Studio */
interface NPCCharacter {
	TrialDone?: boolean;
	CanGetLongDuster?: boolean;
	CanGetForSaleSign?: boolean;
	OweFavor?: boolean;
	KissCount?: number;
	MasturbateCount?: number;
	ClothesTaken?: boolean;
}

/** Sarah */
interface Character {
	OrgasmMeter?: number;
	OrgasmDone?: boolean;
}

/** Private Room & Private Bed */
interface Character {
	PrivateBed?: boolean;
	PrivateBedActivityTimer?: number;
	PrivateBedLeft?: number;
	PrivateBedTop?: number;
	PrivateBedMoveTimer?: number;
	PrivateBedAppearance?: string;
}

interface KidnapCard {
	Move: number;
	Value?: number;
}

/** Kidnap minigame */
interface Character {
	KidnapWillpower?: number;
	KidnapMaxWillpower?: number;
	KidnapCard?: KidnapCard[];
	KidnapStat?: [number, number, number, number];
}

type PandoraPrisonActivity = "Beat" | "Water" | "Transfer" | "Quickie" | "Strip" | "Chastity" | "Tickle" | "ChangeBondage";

/** Pandora NPCs */
interface Character {
	Recruit?: number;
	RecruitOdds?: number;
	RandomOdds?: number;
	QuizLog?: number[];
	QuizFail?: number;
	AllowMove?: boolean;
	DrinkValue?: number;
	TriggerIntro?: boolean;
	FromPandora?: boolean;
	// Pandora Prison
	LastActivity?: PandoraPrisonActivity;
}

/** Magic School */
interface Character {
	House?: "" | MagicSchoolHouse;
}

/** MovieStudio */
interface Character {
	Friendship?: string;
	InterviewCleanCount?: number;
}

/** Slave market */
interface Character {
	ExpectedTraining?: number;
	CurrentTraining?: number;
	TrainingIntensity?: number;
	TrainingCount?: number;
	TrainingCountLow?: number;
	TrainingCountHigh?: number;
	TrainingCountPerfect?: number;
}

interface PlayerCharacter extends Character {
	// PreferenceInitPlayer() must be updated with defaults, when adding a new setting
	ChatSettings?: {
		ColorActions: boolean;
		ColorActivities: boolean;
		ColorEmotes: boolean;
		ColorNames: boolean;
		ColorTheme: ChatColorThemeType;
		DisplayTimestamps: boolean;
		EnterLeave: ChatEnterLeaveType;
		FontSize: ChatFontSizeType;
		MemberNumbers: ChatMemberNumbersType;
		MuStylePoses: boolean;
		ShowActivities: boolean;
		ShowAutomaticMessages: boolean;
		ShowBeepChat: boolean;
		ShowChatHelp: boolean;
		ShrinkNonDialogue: boolean;
		WhiteSpace: "" | "Preserve";
		/** @deprecated */
		AutoBanBlackList?: any;
		/** @deprecated */
		AutoBanGhostList?: any;
		/** @deprecated */
		SearchFriendsFirst?: any;
		/** @deprecated */
		DisableAnimations?: any;
		/** @deprecated */
		SearchShowsFullRooms?: any;
		CensoredWordsList: string;
		CensoredWordsLevel: number;
	};
	VisualSettings?: {
		ForceFullHeight?: boolean;
		UseCharacterInPreviews?: boolean;
		MainHallBackground?: string;
		PrivateRoomBackground?: string;
	};
	AudioSettings?: {
		Volume: number;
		PlayBeeps: boolean;
		/** Play items sounds in chatrooms */
		PlayItem: boolean;
		/** Play sounds only if the player is involved */
		PlayItemPlayerOnly: boolean;
		Notifications: boolean;
	};
	ControllerSettings?: {
		ControllerSensitivity: number;
		ControllerDeadZone: number;
		ControllerA: number;
		ControllerB: number;
		ControllerX: number;
		ControllerY: number;
		ControllerStickUpDown: number;
		ControllerStickLeftRight: number;
		ControllerStickRight: number;
		ControllerStickDown: number;
		ControllerDPadUp: number;
		ControllerDPadDown: number;
		ControllerDPadLeft: number;
		ControllerDPadRight: number;
		ControllerActive: boolean;
	};
	GameplaySettings?: {
		SensDepChatLog: SettingsSensDepName;
		BlindDisableExamine: boolean;
		DisableAutoRemoveLogin: boolean;
		ImmersionLockSetting: boolean;
		EnableSafeword: boolean;
		DisableAutoMaid: boolean;
		OfflineLockedRestrained: boolean;
	};
	ImmersionSettings?: {
		BlockGaggedOOC: boolean;
		StimulationEvents: boolean;
		ReturnToChatRoom: boolean;
		ReturnToChatRoomAdmin: boolean;
		SenseDepMessages: boolean;
		ChatRoomMuffle: boolean;
		BlindAdjacent: boolean;
		AllowTints: boolean;
	};
	LastChatRoom?: string;
	LastChatRoomBG?: string;
	LastChatRoomPrivate?: boolean;
	LastChatRoomSize?: number;
	LastChatRoomLanguage?: ChatRoomLanguage;
	LastChatRoomDesc?: string;
	LastChatRoomAdmin?: number[];
	LastChatRoomBan?: number[];
	LastChatRoomBlockCategory?: ChatRoomBlockCategory[];
	LastChatRoomTimer?: any;
	LastChatRoomSpace?: ChatRoomSpaceType;
	RestrictionSettings?: {
		BypassStruggle: boolean;
		SlowImmunity: boolean;
		BypassNPCPunishments: boolean;
	};
	OnlineSettings?: PlayerOnlineSettings;
	GraphicsSettings?: {
		Font: GraphicsFontName;
		InvertRoom: boolean;
		StimulationFlashes: boolean;
		DoBlindFlash: boolean;
		AnimationQuality: number;
		StimulationFlash: boolean;
		SmoothZoom: boolean;
		CenterChatrooms: boolean;
		AllowBlur: boolean;
	}
	NotificationSettings?: {
		/** @deprecated */
		Audio?: boolean;
		Beeps: NotificationSetting;
		/** @deprecated */
		Chat?: any;
		ChatMessage: NotificationSetting & {
			/** @deprecated */
			IncludeActions?: any;
			Mention?: boolean;
			Normal?: boolean;
			Whisper?: boolean;
			Activity?: boolean;
		};
		/** @deprecated */
		ChatActions?: any;
		ChatJoin: NotificationSetting & {
			/** @deprecated */
			Enabled?: any;
			Owner?: boolean;
			Lovers?: boolean;
			Friendlist?: boolean;
			Subs?: boolean;
		};
		Disconnect: NotificationSetting;
		Larp: NotificationSetting;
		Test: NotificationSetting;
	};
	GhostList?: number[];
	Wardrobe?: ItemBundle[][];
	WardrobeCharacterNames?: string[];
	SavedExpressions?: ({ Group: ExpressionGroupName, CurrentExpression?: ExpressionName }[] | null)[];
	SavedColors: HSVColor[];
	FriendList?: number[];
	FriendNames?: Map<number, string>;
	SubmissivesList?: Set<number>;
	ChatSearchFilterTerms?: string;
	GenderSettings: {
		HideShopItems: GenderSetting;
		AutoJoinSearch: GenderSetting;
	};
	/** The list of items we got confiscated in the Prison */
	ConfiscatedItems?: { Group: AssetGroupName, Name: string }[];
}

/**
 * The player's online settings.
 * @see {@link Player.OnlineSettings}
 */
interface PlayerOnlineSettings {
	AutoBanBlackList: boolean;
	AutoBanGhostList: boolean;
	DisableAnimations: boolean;
	SearchShowsFullRooms: boolean;
	SearchFriendsFirst: boolean;
	SendStatus?: boolean;
	ShowStatus?: boolean;
	EnableAfkTimer: boolean;
}

/** Pandora Player extension */
interface PlayerCharacter {
	Infiltration?: {
		Punishment?: {
			Minutes: number;
			Timer?: number;
			Background: string;
			Difficulty: number;
			FightDone?: boolean;
		}
		Perks?: string;
	}
}

/** Kinky Dungeon Player extension */
interface PlayerCharacter {
	KinkyDungeonKeybindings?: any;
	KinkyDungeonExploredLore?: any[];
}

interface NPCTrait {
	Name: string;
	Value: number;
}

//#endregion

//#region Extended items

/**
 * An interface with all available element metadata fields.
 * Note that only a subset of fields are generally used by a given archetype.
 * @see {@link ElementData}
 * @see {@link ExtendedItemDrawData}
 */
interface ElementMetaData {
	/** Whether to draw an element-accompanying image or not */
	drawImage?: boolean,
	/** The name of a supported thumbnail image in \CSS\Styles.css that will show the current position on the slider */
	icon?: string,
	/** Whether an options shows up in the UI. Useful for options that are managed programmatically. */
	hidden?: boolean,
}

declare namespace ElementMetaData {
	interface Typed { drawImage: boolean, hidden: boolean }
	interface Modular { drawImage: boolean, hidden: boolean }
	interface Vibrating  { drawImage: false, hidden: false }
	interface Text {}
	interface VariableHeight { icon: string }
}

/** @see {@link ElementData} */
type ElementConfigData<MetaData extends ElementMetaData> = {
	/** A 4-tuple with X & Y coordinates, width and height. */
	position?: PartialRectTuple,
} & MetaData;

/**
 * An interface with element coordinates and additional (archetype-specific metadata).
 * @template MetaData A record with (archetype-specific) additional element metadata
 * @see {@link ExtendedItemDrawData}
 */
type ElementData<MetaData extends ElementMetaData> = {
	/** A 4-tuple with X & Y coordinates, width and height. */
	position: RectTuple,
} & MetaData;

/** @see {@link ExtendedItemDrawData} */
interface ExtendedItemConfigDrawData<MetaData extends ElementMetaData> {
	/** An array with two-tuples of X and Y coordinates for the buttons and, optionally, the buttons width and height */
	elementData?: ElementConfigData<MetaData>[],
	/** The number of buttons to be drawn per page */
	itemsPerPage?: number,
}

/** @see {@link ExtendedItemDrawData} */
interface VariableHeightConfigDrawData extends ExtendedItemConfigDrawData<{}> {
	elementData: { position: RectTuple, icon: string }[],
}

/**
 * An interface with element-specific drawing data for a given screen.
 * @template MetaData A record with (archetype-specific) additional element metadata
 */
interface ExtendedItemDrawData<MetaData extends ElementMetaData> extends Required<ExtendedItemConfigDrawData<MetaData>> {
	/** A list of {@link ElementData} interfaces, one for each to-be drawn element (_e.g._ buttons) */
	elementData: ElementData<MetaData>[],
	/** The number of pages */
	pageCount: number,
	/** Whether pagination is required; i.e. if the number of buttons is larger than {@link ExtendedItemDrawData.itemsPerPage} */
	paginate: boolean,
}

/** A record containing various dialog keys used by the extended item screen */
interface ExtendedItemDialog<
	OptionType extends ExtendedItemOption
> {
	/** The dialogue prefix for the player prompt that is displayed on each module's menu screen */
	header: string;
	/** The dialogue prefix for the name of each module */
	module?: string;
	/** The dialogue prefix for the name of each option */
	option?: string;
	/** The dialogue prefix that will be used for each of the item's chatroom messages */
	chat?: string | ExtendedItemChatCallback<OptionType>;
	/** The prefix used for dialog keys representing an NPC's reactions to item type changes */
	npc?: string | ExtendedItemNPCCallback<OptionType>;
}


/** A record containing various dialog keys used by the extended item screen */
interface ExtendedItemCapsDialog<
	OptionType extends ExtendedItemOption
> {
	/** The dialogue prefix for the player prompt that is displayed on each module's menu screen */
	Header?: string;
	/** The dialogue prefix for the name of each module */
	Module?: string;
	/** The dialogue prefix for the name of each option */
	Option?: string;
	/** The dialogue prefix that will be used for each of the item's chatroom messages */
	Chat?: string | ExtendedItemChatCallback<OptionType>;
	/** The prefix used for dialog keys representing an NPC's reactions to item type changes */
	Npc?: string | ExtendedItemNPCCallback<OptionType>;
}

/** Basic callback for extended item script hooks */
type ExtendedItemScriptHookCallback<DataType extends ExtendedItemData<any>, T extends any[], RT=void> = (
	data: DataType,
	originalFunction: null | ((...args: T) => RT),
	...args: T,
) => RT;

/** Basic callback for extended item functions */
type ExtendedItemCallback<T extends any[], RT=void> = (
	...args: T,
) => RT;

/** An interface-based version of {@link ExtendedItemScriptHookCallbacks} with decapitalized keys */
interface ExtendedItemScriptHookStruct<
	DataType extends ExtendedItemData<any>,
	OptionType extends ExtendedItemOption
> {
	load: null | ExtendedItemScriptHookCallbacks.Load<DataType>,
	draw: null | ExtendedItemScriptHookCallbacks.Draw<DataType>,
	click: null | ExtendedItemScriptHookCallbacks.Click<DataType>,
	exit: null | ExtendedItemScriptHookCallbacks.Exit<DataType>,
	validate: null | ExtendedItemScriptHookCallbacks.Validate<DataType, OptionType>,
	publishAction: null | ExtendedItemScriptHookCallbacks.PublishAction<DataType, OptionType>,
	init: null | ExtendedItemScriptHookCallbacks.Init<DataType>,
	setOption: null | ExtendedItemScriptHookCallbacks.SetOption<DataType, OptionType>,
	beforeDraw: null | ExtendedItemScriptHookCallbacks.BeforeDraw<DataType>,
	afterDraw: null | ExtendedItemScriptHookCallbacks.AfterDraw<DataType>,
	scriptDraw: null | ExtendedItemScriptHookCallbacks.ScriptDraw<DataType>,
}

/** An interface-based version of {@link ExtendedItemScriptHookCallbacks} */
interface ExtendedItemCapsScriptHooksStruct<
	DataType extends ExtendedItemData<any>,
	OptionType extends ExtendedItemOption
> {
	Load?: ExtendedItemScriptHookCallbacks.Load<DataType>,
	Draw?: ExtendedItemScriptHookCallbacks.Draw<DataType>,
	Click?: ExtendedItemScriptHookCallbacks.Click<DataType>,
	Exit?: ExtendedItemScriptHookCallbacks.Exit<DataType>,
	Validate?: ExtendedItemScriptHookCallbacks.Validate<DataType, OptionType>,
	PublishAction?: ExtendedItemScriptHookCallbacks.PublishAction<DataType, OptionType>,
	Init?: ExtendedItemScriptHookCallbacks.Init<DataType>,
	SetOption?: ExtendedItemScriptHookCallbacks.SetOption<DataType, OptionType>,
	BeforeDraw?: ExtendedItemScriptHookCallbacks.BeforeDraw<DataType>,
	AfterDraw?: ExtendedItemScriptHookCallbacks.AfterDraw<DataType>,
	ScriptDraw?: ExtendedItemScriptHookCallbacks.ScriptDraw<DataType>,
}

/** An interface-based version of {@link ExtendedItemCallbacks} with decapitalized keys*/
interface ExtendedItemCallbackStruct<
	OptionType extends ExtendedItemOption
> {
	load?: ExtendedItemCallbacks.Load,
	draw?: ExtendedItemCallbacks.Draw,
	click?: ExtendedItemCallbacks.Click,
	exit?: ExtendedItemCallbacks.Exit,
	validate?: ExtendedItemCallbacks.Validate<OptionType>,
	publishAction?: ExtendedItemCallbacks.PublishAction<OptionType>,
	init?: ExtendedItemCallbacks.Init,
	setOption?: ExtendedItemCallbacks.SetOption<OptionType>,
	beforeDraw?: ExtendedItemCallbacks.BeforeDraw,
	afterDraw?: ExtendedItemCallbacks.AfterDraw,
	scriptDraw?: ExtendedItemCallbacks.ScriptDraw,
}

/** Namespace with item-specific functions typically called by extended items. */
declare namespace ExtendedItemCallbacks {
	/**
	 * Callback for extended item `Load` functions.
	 * `Load` functions are responsible for setting up the UI when initially opening the extended item menu.
	 */
	type Load = ExtendedItemCallback<[]>;
	/**
	 * Callback for extended item `Draw` functions.
	 * `Draw` functions are responsible for drawing any UI elements within the extended item menu.
	 */
	type Draw = ExtendedItemCallback<[]>;
	/**
	 * Callback for extended item `Click` functions.
	 * `Click` functions are responsible for managing any mouse clicks within the extended item menu.
	 */
	type Click = ExtendedItemCallback<[]>;
	/**
	 * Callback for extended item `Exit` functions.
	 * `Exit` functions are responsible for cleaning up any UI elements when closing the extended item menu.
	 */
	type Exit = ExtendedItemCallback<[]>;
	/**
	 * Callback for extended item `Validate` functions.
	 * `Validate` functions are responsible for validating any change in an item's properties.
	 * @param C The character that has the item equiped
	 * @param item The item in question
	 * @param newOption The newly selected extended item option
	 * @param previousOption The previusly selected extended item option
	 * @returns A non-empty message string if the item failed validation, or an empty string otherwise
	 */
	type Validate<
		OptionType extends ExtendedItemOption
	> = ExtendedItemCallback<[C: Character, item: Item, newOption: OptionType, previousOption: OptionType], string>;
	/**
	 * Callback for extended item `PublishAction` functions.
	 * `PublishAction` functions are responsible for reporting any changes to an item's properties via a chat message.
	 * @param C The character that has the item equiped
	 * @param item The item in question
	 * @param newOption The newly selected extended item option
	 * @param previousOption The previusly selected extended item option
	 */
	type PublishAction<
		OptionType extends ExtendedItemOption
	> = ExtendedItemCallback<[C: Character, item: Item, newOption: OptionType, previousOption: OptionType]>;
	/**
	 * Callback for extended item `Init` functions.
	 * `Init` functions are responsible for setting the initial properties of an extended item.
	 * @param C The character that has the item equiped
	 * @param item The item in question
	 * @param refresh Whether the character and relevant item should be refreshed and pushed to the server
	 * @returns Whether the items properties were actually updated or not
	 */
	type Init = ExtendedItemCallback<[C: Character, item: Item, refresh: boolean], boolean>;
	/**
	 * Callback for extended item `SetOption` functions.
	 * @param C The character that has the item equiped
	 * @param item The item in question
	 * @param newOption The newly selected extended item option
	 * @param previousOption The previusly selected extended item option
	 * @param push Whether to push to changes to the server
	 */
	type SetOption<
		OptionType extends ExtendedItemOption
	> = ExtendedItemCallback<[C: Character, item: Item, newOption: OptionType, previousOption: OptionType, push: boolean]>;
	/**
	 * Callback for extended item `AfterDraw` functions.
	 * Relevant for assets that define {@link Asset.DynamicAfterDraw}.
	 * @param drawData The dynamic draw data
	 */
	type AfterDraw<
		PersistentData extends Record<string, any> = Record<string, unknown>
	> = ExtendedItemCallback<[drawData: DynamicDrawingData<PersistentData>]>;
	/**
	 * Callback for extended item `BeforeDraw` functions.
	 * Relevant for assets that define {@link Asset.DynamicBeforeDraw}.
	 * @param drawData The dynamic draw data
	 * @returns A record with any and all to-be overriden draw data
	 */
	type BeforeDraw<
		PersistentData extends Record<string, any> = Record<string, unknown>
	> = ExtendedItemCallback<[drawData: DynamicDrawingData<PersistentData>], DynamicBeforeDrawOverrides>;
	/**
	 * Callback for extended item `ScriptDraw` functions.
	 * Relevant for assets that define {@link Asset.DynamicScriptDraw}.
	 * @param drawData The dynamic draw data
	 */
	type ScriptDraw<
		PersistentData extends Record<string, any> = Record<string, unknown>
	> = ExtendedItemCallback<[drawData: DynamicScriptCallbackData<PersistentData>]>;
}

/**
 * Namespace with item-specific script hooks used for constructing typical extended items functions.
 * @see {@link ExtendedItemCallbacks}
 */
declare namespace ExtendedItemScriptHookCallbacks {
	/**
	 * Callback for extended item `Load` script hooks.
	 * `Load` functions are responsible for setting up the UI when initially opening the extended item menu.
	 * @param data The items extended item data
	 * @param originalFunction The function (if any) that is normally called when an archetypical item reaches this point
	 */
	type Load<
		DataType extends ExtendedItemData<any>
	> = ExtendedItemScriptHookCallback<DataType, []>;
	/**
	 * Callback for extended item `Draw` script hooks.
	 * `Draw` functions are responsible for drawing any UI elements within the extended item menu.
	 * @param data The items extended item data
	 * @param originalFunction The function (if any) that is normally called when an archetypical item reaches this point
	 */
	type Draw<
		DataType extends ExtendedItemData<any>
	> = ExtendedItemScriptHookCallback<DataType, []>;
	/**
	 * Callback for extended item `Click` script hooks.
	 * `Click` functions are responsible for managing any mouse clicks within the extended item menu.
	 * @param data The items extended item data
	 * @param originalFunction The function (if any) that is normally called when an archetypical item reaches this point
	 */
	type Click<
		DataType extends ExtendedItemData<any>
	> = ExtendedItemScriptHookCallback<DataType, []>;
	/**
	 * Callback for extended item `Exit` script hooks.
	 * `Exit` functions are responsible for cleaning up any UI elements when closing the extended item menu.
	 * @param data The items extended item data
	 * @param originalFunction The function (if any) that is normally called when an archetypical item reaches this point
	 */
	type Exit<
		DataType extends ExtendedItemData<any>
	> = ExtendedItemScriptHookCallback<DataType, []>;
	/**
	 * Callback for extended item `Validate` script hooks.
	 * `Validate` functions are responsible for validating any change in an item's properties.
	 * @param data The items extended item data
	 * @param originalFunction The function (if any) that is normally called when an archetypical item reaches this point
	 * @param C The character that has the item equiped
	 * @param item The item in question
	 * @param newOption The newly selected extended item option
	 * @param previousOption The previusly selected extended item option
	 * @returns A non-empty message string if the item failed validation, or an empty string otherwise
	 */
	type Validate<
		DataType extends ExtendedItemData<any>,
		OptionType extends ExtendedItemOption
	> = ExtendedItemScriptHookCallback<DataType, [C: Character, item: Item, newOption: OptionType, previousOption: OptionType], string>;
	/**
	 * Callback for extended item `PublishAction` script hooks.
	 * `PublishAction` functions are responsible for reporting any changes to an item's properties via a chat message.
	 * @param data The items extended item data
	 * @param originalFunction The function (if any) that is normally called when an archetypical item reaches this point
	 * @param C The character that has the item equiped
	 * @param item The item in question
	 * @param newOption The newly selected extended item option
	 * @param previousOption The previusly selected extended item option
	 */
	type PublishAction<
		DataType extends ExtendedItemData<any>,
		OptionType extends ExtendedItemOption
	> = ExtendedItemScriptHookCallback<DataType, [C: Character, item: Item, newOption: OptionType, previousOption: OptionType]>;
	/**
	 * Callback for extended item `Init` script hooks.
	 * `Init` functions are responsible for setting the initial properties of an extended item.
	 * @param data The items extended item data
	 * @param originalFunction The function (if any) that is normally called when an archetypical item reaches this point
	 * @param C The character that has the item equiped
	 * @param item The item in question
	 * @param refresh Whether the character and relevant item should be refreshed and pushed to the server
	 * @returns Whether the items properties were actually updated or not
	 */
	type Init<
		DataType extends ExtendedItemData<any>
	> = ExtendedItemScriptHookCallback<DataType, [C: Character, item: Item, refresh: boolean], boolean>;
	/**
	 * Callback for extended item `SetOption` functions.
	 * @param data The items extended item data
	 * @param originalFunction The function (if any) that is normally called when an archetypical item reaches this point
	 * @param C The character that has the item equiped
	 * @param item The item in question
	 * @param newOption The newly selected extended item option
	 * @param previousOption The previusly selected extended item option
	 * @param push Whether to push to changes to the server
	 * @returns
	 */
	type SetOption<
		DataType extends ExtendedItemData<any>,
		OptionType extends ExtendedItemOption
	> = ExtendedItemScriptHookCallback<DataType, [C: Character, item: Item, newOption: OptionType, previousOption: OptionType, push: boolean]>;
	/**
	 * Callback for extended item `AfterDraw` functions.
	 * Relevant for assets that define {@link Asset.DynamicAfterDraw}.
	 * @param data The items extended item data
	 * @param originalFunction The function (if any) that is normally called when an archetypical item reaches this point
	 * @param drawData The dynamic draw data
	 */
	type AfterDraw<
		DataType extends ExtendedItemData<any>,
		PersistentData extends Record<string, any> = Record<string, unknown>
	> = ExtendedItemScriptHookCallback<DataType, [drawData: DynamicDrawingData<PersistentData>]>;
	/**
	 * Callback for extended item `BeforeDraw` functions.
	 * Relevant for assets that define {@link Asset.DynamicBeforeDraw}.
	 * @param data The items extended item data
	 * @param originalFunction The function (if any) that is normally called when an archetypical item reaches this point
	 * @param drawData The dynamic draw data
	 * @returns A record with any and all to-be overriden draw data
	 */
	type BeforeDraw<
		DataType extends ExtendedItemData<any>,
		PersistentData extends Record<string, any> = Record<string, unknown>
	> = ExtendedItemScriptHookCallback<DataType, [drawData: DynamicDrawingData<PersistentData>], DynamicBeforeDrawOverrides>;
	/**
	 * Callback for extended item `ScriptDraw` functions.
	 * Relevant for assets that define {@link Asset.DynamicScriptDraw}.
	 * @param data The items extended item data
	 * @param originalFunction The function (if any) that is normally called when an archetypical item reaches this point
	 * @param drawData The dynamic draw data
	 */
	type ScriptDraw<
		DataType extends ExtendedItemData<any>,
		PersistentData extends Record<string, any> = Record<string, unknown>
	> = ExtendedItemScriptHookCallback<DataType, [drawData: DynamicScriptCallbackData<PersistentData>]>;
}

/** Union of all (archetype-specific) {@link ExtendedItemData.chatSetting} allowed values. */
type ExtendedItemChatSetting = "default" | TypedItemChatSetting | ModularItemChatSetting;

/**
 * Abstract extended item data interface that all archetypical item data interfaces must implement.
 * Archetypes are free to demand any appropriate subtype for a given property.
 */
interface ExtendedItemData<OptionType extends ExtendedItemOption> {
	/** The archetype of the extended item data */
	archetype: ExtendedArchetype;
	/**
	 * The chat message setting for the item. This can be provided to allow
	 * finer-grained chatroom message keys for the item.
	 * Archetypes must use the `"default"` literal string as default value.
	 */
	chatSetting: ExtendedItemChatSetting;
	/** A record containing various dialog keys used by the extended item screen */
	dialogPrefix: ExtendedItemDialog<OptionType>;
	/**
	 * A recond containing functions that are run on load, click, draw, exit, and validate, with the original archetype function
	 * and parameters passed on to them. If undefined, these are ignored.
	 * Note that scripthook functions must be loaded before `Female3DCGExtended.js` in `index.html`.
	 */
	scriptHooks: ExtendedItemScriptHookStruct<any, OptionType>;
	/** The asset reference */
	asset: Asset;
	/** A key uniquely identifying the asset */
	key: string;
	/** The common prefix used for all extended item functions associated with the asset */
	functionPrefix: string;
	/** The common prefix used for all dynamic asset hook functions for the asset */
	dynamicAssetsFunctionPrefix: string;
	/** An array of the chat message tags that should be included in the item's chatroom messages. */
	chatTags: CommonChatTags[];
	/** Contains custom dictionary entries in the event that the base ones do not suffice. */
	dictionary: ExtendedItemDictionaryCallback<OptionType>[];
	/**
	 * To-be initialized properties independent of the selected item module(s).
	 * Relevant if there are properties that are (near) exclusively managed by {@link ExtendedItemData.scriptHooks} functions.
	 */
	baselineProperty: ItemPropertiesNoArray | null;
	/** The extended item option of the super screen that this archetype was initialized from (if any) */
	parentOption: null | ExtendedItemOption;
	/** An interface with element-specific drawing data for a given screen. */
	drawData: ExtendedItemDrawData<{}>;
}

/** A struct-type that maps archetypes to their respective extended item data.  */
interface ExtendedDataLookupStruct {
	[ExtendedArchetype.TYPED]: TypedItemData;
	[ExtendedArchetype.MODULAR]: ModularItemData;
	[ExtendedArchetype.VIBRATING]: VibratingItemData;
	[ExtendedArchetype.VARIABLEHEIGHT]: VariableHeightData;
	[ExtendedArchetype.TEXT]: TextItemData;
}

interface AssetOverrideHeight {
	Height: number;
	Priority: number;
	HeightRatioProportion?: number;
}

/**
 * The type for OverridePriority in extended items.
 *
 * Either a single number that will cause all of the asset's layer to
 * inherit that priority, or a more precise specifier keyed by layer name.
 */
type AssetLayerOverridePriority = Record<string, number> | number;

/**
 * Base properties of extended items derived from their respective {@link Asset} definition.
 *
 * Those are the properties the main game code enforces.
 */
interface AssetDefinitionProperties {
	/**
	 * The difficulty of the item
	 * @see {@link Asset.Difficulty}
	 */
	Difficulty?: number;
	/**
	 * ???
	 * @see {@link Asset.Attribute}
	 */
	Attribute?: AssetAttribute[];

	/**
	 * Override the height of the item
	 * @see {@link Asset.OverrideHeight}
	 */
	OverrideHeight?: AssetOverrideHeight;
	/**
	 * How much the character should be moved up
	 * @see {@link Asset.HeightModifier}
	 */
	HeightModifier?: number;
	/**
	 * The drawing priority of the item
	 * @see {@link Asset.OverridePriority}
	 */
	OverridePriority?: AssetLayerOverridePriority;
	/**
	 * The default color of the item
	 * @see {@link Asset.DefaultColor}
	 */
	DefaultColor?: ItemColor;

	/**
	 * A list of allowed activities
	 * @see {@link Asset.AllowActivity}
	 */
	AllowActivity?: ActivityName[];
	/**
	 * A list of groups allowed activities
	 * @see {@link Asset.AllowActivityOn}
	 */
	AllowActivityOn?: AssetGroupName[];

	/**
	 * Items that should be hidden by this item
	 * @see {@link Asset.HideItem}
	 */
	HideItem?: string[];
	/**
	 * Items that should not be hidden by this item
	 * @see {@link Asset.HideItemExclude}
	 */
	HideItemExclude?: string[];
	/**
	 * Items groups that should be hidden by this item
	 * @see {@link Asset.Hide}
	 */
	Hide?: AssetGroupName[];

	/**
	 * The groups that this item blocks
	 * @see {@link Asset.Block}
	 */
	Block?: AssetGroupItemName[];

	/**
	 * Effects that are applied by this item
	 * @see {@link Asset.Effect}
	 */
	Effect?: EffectName[];

	/**
	 * A list of custom tints
	 * @see {@link Asset.Tint}
	 */
	Tint?: TintDefinition[];

	// Pose-related properties

	/**
	 * A list of poses that should forcefully be set
	 * @see {@link Asset.SetPose}
	 */
	SetPose?: AssetPoseName[];
	/**
	 * A list of poses
	 * @see {@link Asset.AllowActivePose}
	 */
	AllowActivePose?: AssetPoseName[];
	/**
	 * A list of allowed poses
	 * @see {@link Asset.AllowPose}
	 */
	AllowPose?: AssetPoseName[];
	/**
	 * A list of poses
	 * @see {@link Asset.WhitelistActivePose}
	 */
	WhitelistActivePose?: AssetPoseName[];
	/**
	 * A list of poses that should be frozen
	 * @see {@link Asset.FreezeActivePose}
	 */
	FreezeActivePose?: AssetPoseCategory[];

	/**
	 * Whether an item can be unlocked by the player even if they're restrained
	 * @see {@link Asset.SelfUnlock}
	 */
	SelfUnlock?: boolean;

	/**
	 * The timer for after how long until a lock should be removed.
	 * Also used for timed emoticons.
	 * @see {@link Asset.RemoveTimer}
	 */
	RemoveTimer?: number;

	/**
	 * The asset's draw opacity
	 * @see {@link Asset.Opacity}
	 */
	Opacity?: number;

	/**
	 * A custom background for this option that overrides the default
	 * @see {@link Asset.CustomBlindBackground}
	 */
	CustomBlindBackground?: string;

	/**
	 * A list of fetishes affected by the item
	 * @see {@link Asset.Fetish}
	 */
	Fetish?: FetishName[];
}

/**
 * Base properties for extended items
 *
 * Those are the properties the main game code enforces.
 */
interface ItemPropertiesBase {
	/** A string (or `null`) denoting the state of an extended item. How the type-string translate to concrete properties depends on the Archetype in question. */
	Type?: string | null;

	/** A facial expression */
	Expression?: ExpressionName;

	/** Whether the asset affects should be overriden rather than extended */
	OverrideAssetEffect?: boolean;

	// Vibratory-related properties

	/** The vibrator mode */
	Mode?: VibratorMode;
	/** The vibrator intensity */
	Intensity?: VibratorIntensity;
	/** The vibrator's state; only relevant for advanced vibrator modes */
	State?: VibratorModeState;
}

/**
 * Custom properties for extended items
 *
 * Those are properties that are asset-specific, so the handling might be done
 * per-item.
 */
interface ItemPropertiesCustom {
	/**
	 * The member number of the player adding the item.
	 * Only set if the asset is marked as {@link AssetDefinition.CharacterRestricted}.
	 */
	ItemMemberNumber?: number;

	//#region Lock properties

	/** Asset name of the lock */
	LockedBy?: AssetLockType;
	/** The member number of the person that applied the lock */
	LockMemberNumber?: number | string;
	/** `/^[A-Z]{1,8}$/`, Used by `PasswordPadlock`, `SafewordPadlock` and `TimerPasswordPadlock` lock */
	Password?: string;
	/** Comma separated numbers */
	LockPickSeed?: string;
	/** `/^[0-9]{4}$/`, Used by `CombinationPadlock` lock */
	CombinationNumber?: string;
	/** Comma separated numbers; used by `HighSecurityPadlock` */
	MemberNumberListKeys?: string;
	/** Used by `PasswordPadlock`, `SafewordPadlock` and `TimerPasswordPadlock` locks */
	Hint?: string;
	/** Used by `PasswordPadlock`, `SafewordPadlock` and `TimerPasswordPadlock` locks; if the lock has been set with password */
	LockSet?: boolean;
	/** Whether to remove item on timer lock unlock; used by `LoversTimerPadlock`, `MistressTimerPadlock`, `OwnerTimerPadlock`, `TimerPadlock`, `TimerPasswordPadlock` */
	RemoveItem?: boolean;
	/** Only for `PasswordPadlock` */
	RemoveOnUnlock?: boolean;
	/** Whether time is shown or "Unknown time left"; used by `LoversTimerPadlock`, `MistressTimerPadlock`, `OwnerTimerPadlock`, `TimerPasswordPadlock` */
	ShowTimer?: boolean;
	/** Enable input; used by `LoversTimerPadlock`, `MistressTimerPadlock`, `OwnerTimerPadlock`, `TimerPasswordPadlock` */
	EnableRandomInput?: boolean;
	/** List of people who publicly modified time on lock; used by `LoversTimerPadlock`, `MistressTimerPadlock`, `OwnerTimerPadlock`, `TimerPasswordPadlock` */
	MemberNumberList?: number[];

	//#endregion

	/** The inflation level of inflatable items */
	InflateLevel?: 0 | 1 | 2 | 3 | 4;

	/** The suction level of items with a suction effect */
	SuctionLevel?: 0 | 1 | 2 | 3 | 4;

	/** 1st line of text for user-entered text data */
	Text?: string;
	/** 2nd line of text for user-entered text data */
	Text2?: string;
	/** 3rd line of text for user-entered text data */
	Text3?: string;

	/** Whether the item blocks access to the butt */
	LockButt?: boolean;

	// #region Futuristic Set open permissions

	/** Whether all players can use futuristic head devices */
	OpenPermission?: boolean;
	/** Whether all players can use futuristic arm devices */
	OpenPermissionArm?: boolean;
	/** Whether all players can use futuristic leg devices */
	OpenPermissionLeg?: boolean;
	/** Whether all players can use futuristic chastity devices */
	OpenPermissionChastity?: boolean;
	/** Whether the usage of remotes is blocked */
	BlockRemotes?: boolean;

	// #endregion

	/** The futuristic bra's heart rate value */
	HeartRate?: number;
	/** Is the futuristic bra's heart icon shown */
	HeartIcon?: boolean;

	// #region Futuristic gag & panel gag settings */

	/** The item's auto-punishment sensitivity */
	AutoPunish?: 0 | 1 | 2 | 3;
	/** The remaining time for the gag's auto-inflation */
	AutoPunishUndoTime?: number;
	/** The default time for the gag's auto-inflation */
	AutoPunishUndoTimeSetting?: 120000 | 300000 | 900000 | 3600000 | 72000000;
	/** The gag module-index prior to triggering auto-inflation */
	OriginalSetting?: 0 | 1 | 2 | 3;
	/** Whether gag's blinking light is on or off */
	BlinkState?: boolean;
	/**
	 * An extended item option
	 * @todo Investigate whether this property still actually exists
	 */
	Option?: ExtendedItemOption;

	// #endregion

	// #region Futuristic chastity settings

	/** Whether attempting to remove the belt should result in punishment */
	PunishStruggle?: boolean;
	/** Whether attempting to remove an item in general should result in punishment */
	PunishStruggleOther?: boolean;
	/** Whether orgasms should result in punishment */
	PunishOrgasm?: boolean;
	/** Whether standing up should result in punishment */
	PunishStandup?: boolean;
	/** The punishment for talking; represents an index of {@link FuturisticTrainingBeltSpeechPunishments} */
	PunishSpeech?: 0 | 1 | 2 | 3;
	/** The punishment for not speaking a required word; represents an index of {@link FuturisticTrainingBeltSpeechPunishments} */
	PunishRequiredSpeech?: 0 | 1 | 2 | 3;
	/** A string with comma-separated required words */
	PunishRequiredSpeechWord?: string;
	/** The punishment for speaking a prohibited word; represents an index of {@link FuturisticTrainingBeltSpeechPunishments} */
	PunishProhibitedSpeech?: 0 | 1 | 2 | 3;
	/** A string with comma-separated prohibited words */
	PunishProhibitedSpeechWords?: string;
	/** Internal cooldown timer for automatic shocks */
	NextShockTime?: number;
	/** The mode of the belts vibrator; represents an index of {@link FuturisticTrainingBeltModes} */
	PublicModeCurrent?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	/** An integer denoting who can access the belt; represents an index of {@link FuturisticTrainingBeltPermissions} */
	PublicModePermission?: 0 | 1 | 2;

	// #endregion

	/** A comma-separated string with the futuristic vibrator's trigger words */
	TriggerValues?: string;
	/** A string denoting who has permission to use the vibrator's trigger words */
	AccessMode?: ItemVulvaFuturisticVibratorAccessMode;

	/** How intense the shock should be */
	ShockLevel?: 0 | 1 | 2;

	/** The number of inserted beads */
	InsertedBeads?: 1 | 2 | 3 | 4 | 5;

	/** Whether the item displays a chat message to all other people in the room */
	ShowText?: boolean;

	/** Number of times the item was triggered; often used by shock collars */
	TriggerCount?: number;

	/** Number of times the suitcase got cracked */
	Iterations?: number;

	/** Allows reverting back to these properties on exiting an extended menu */
	Revert?: boolean;

	/** Whether the kennel door is open */
	Door?: boolean;
	/** Whether the kennel has padding */
	Padding?: boolean;

	/** Only available as overrides on the script item */
	UnHide?: AssetGroupName[];

	/** Lucky Wheel: the section labels */
	Texts?: string[];

	/** Lucky Wheel: the angle the wheel should spin to */
	TargetAngle?: number;

	/** PortalLink: Used to link a remote to its target asset. */
	PortalLinkCode?: string;
}

interface ItemProperties extends ItemPropertiesBase, AssetDefinitionProperties, ItemPropertiesCustom { }

/** An {@link ItemProperties} super-type with all array-containing values removed. */
type ItemPropertiesNoArray = { [k in keyof ItemProperties]: ItemProperties[k] extends any[] ? never : ItemProperties[k] };

//#endregion

/** An object containing modular item configuration for an asset. Contains all of the necessary information for the
 * item's load, draw & click handlers.
 */
interface ModularItemData extends ExtendedItemData<ModularItemOption> {
	archetype: "modular";
	/**
	 * The item's chatroom message setting. Determines the level of
	 * granularity for chatroom messages when the item's module values change.
	 */
	chatSetting: ModularItemChatSetting;
	/** The total number of types permitted by the item */
	typeCount: number;
	/** A record containing various dialog keys used by the extended item screen */
	dialogPrefix: {
		/** The dialogue prefix for the player prompt that is displayed on each module's menu screen */
		header: string;
		/** The dialogue prefix for the name of each module */
		module: string;
		/** The dialogue prefix for the name of each option */
		option: string;
		/** The dialogue prefix that will be used for each of the item's chatroom messages */
		chat: string | ExtendedItemChatCallback<ModularItemOption>;
	};
	/** The module definitions for the modular item */
	modules: ModularItemModule[];
	/** Name of currently active module */
	currentModule: string;
	/** A lookup for the current page in the extended item menu for each of the item's modules */
	pages: Record<string, number>;
	/** A lookup for the draw data for each of the item's modules */
	drawData: ExtendedItemDrawData<ElementMetaData.Modular>;
	/** A lookup for the draw functions for each of the item's modules */
	drawFunctions: Record<string, () => void>;
	/** A lookup for the click functions for each of the item's modules */
	clickFunctions: Record<string, () => void>;
	/**
	 * A recond containing functions that are run on load, click, draw, exit, and validate, with the original archetype function
	 * and parameters passed on to them. If undefined, these are ignored.
	 * Note that scripthook functions must be loaded before `Female3DCGExtended.js` in `index.html`.
	 */
	scriptHooks: ExtendedItemScriptHookStruct<ModularItemData, ModularItemOption>;
	parentOption: null;
}

/** A 3-tuple containing data for drawing a button in a modular item screen. A button definition takes the
 * format:
 * ```
 * [moduleOrOption, currentOption, prefix]
 * ```
 * The moduleOrOption is the to be drawn item module or option.
 * The currentOption is currently active option within the relevant module.
 * The prefix is the dialog prefix for the buttons text.
 */
type ModularItemButtonDefinition = [
	moduleOrOption: ModularItemOption | ModularItemModule,
	currentOption: ModularItemOption,
	prefix: string,
];

//#endregion

//#region Typed Items

/**
 * Callback for custom functions used for setting the `DialogFocusItem.Type` attribute.
 * Relevant for typed items that lack an archetype.
 */
type TypedItemSetTypeCallback = (NewType: string) => void;

/**
 * An object containing typed item configuration for an asset. Contains all of the necessary information for the item's
 * load, draw & click handlers.
 */
interface TypedItemData extends ExtendedItemData<TypedItemOption> {
	archetype: "typed";
	drawData: ExtendedItemDrawData<ElementMetaData.Typed>;
	/** The list of extended item options available for the item */
	options: TypedItemOption[];
	/** A record containing various dialog keys used by the extended item screen */
	dialogPrefix: {
		/** The dialog key for the item's load text (usually a prompt to select the type) */
		header: string;
		/** The prefix used for dialog keys representing the display names of the item's types */
		option: string;
		/** The prefix used for dialog keys representing the item's chatroom messages when its type is changed */
		chat: string | ExtendedItemChatCallback<TypedItemOption>;
		/** The prefix used for dialog keys representing an NPC's reactions to item type changes */
		npc: string | ExtendedItemNPCCallback<TypedItemOption>;
	};
	/**
	 * The chat message setting for the item. This can be provided to allow
	 * finer-grained chatroom message keys for the item. Defaults to {@link TypedItemChatSetting.TO_ONLY}
	 */
	chatSetting: TypedItemChatSetting;
	/**
	 * A recond containing functions that are run on load, click, draw, exit, validate and publishaction,
	 * with the original archetype function and parameters passed on to them. If undefined, these are ignored.
	 * Note that scripthook functions must be loaded before `Female3DCGExtended.js` in `index.html`.
	 */
	scriptHooks: ExtendedItemScriptHookStruct<TypedItemData, TypedItemOption>;
	parentOption: null;
}

//#region Validation

/**
 * A parameter object containing information used to validate and sanitize character appearance update diffs. An
 * appearance update has a source character (the player that sent the update) and a target character (the character
 * being updated). What is allowed in an update varies depending on the status of the target character in relation to
 * the source character (i.e. whether they are the target's lover/owner, or the target themselves, and also whether or
 * not they have been whitelisted by the target).
 */
interface AppearanceUpdateParameters {
	/** The character whose appearance is being updated */
	C: Character;
	/** Whether or not the source player is the same as the target player */
	fromSelf: boolean;
	/**
	 * Whether or not the source player has permissions to use owner-only items (i.e. they are either the target
	 * themselves, or the target's owner)
	 */
	fromOwner: boolean;
	/**
	 * Whether or not the source player has permissions to use lover-only items (i.e. they are the target themselves,
	 * one of the target's lovers, or the target's owner, provided the target's lover rules permit their owner using
	 * lover-only items)
	 */
	fromLover: boolean;
	/**
	 * Whether or not the source player has permissions to use family-only items (in same BDSM family)
	 */
	fromFamily: boolean;
	/** The script permission levels that the source player has with respect to the receiver */
	permissions: ScriptPermissionLevel[];
	/** The member number of the source player */
	sourceMemberNumber: number;
}

/**
 * A wrapper object containing the results of a diff resolution. This includes the final item that the diff resolved to
 * (or null if the diff resulted in no item, for example in the case of item removal), along with a valid flag which
 * indicates whether or not the diff was fully valid or not.
 */
interface ItemDiffResolution {
	/**
	 * The resulting item after resolution of the item diff, or null if the diff resulted in no item being equipped in
	 * the given group
	 */
	item: Item | null;
	/**
	 * Whether or not the diff was fully valid. In most cases, an invalid diff will result in the whole appearance
	 * update being rolled back, but in some cases the change will be accepted, but some properties may be modified to
	 * keep the resulting item valid - in both situations, the valid flag will be returned as false, indicating that a
	 * remedial appearance update should be made by the target player.
	 */
	valid: boolean;
}

/**
 * A wrapper object containing the results of an appearance validation. Contains a sanitized appearance array and a
 * valid flag which indicates whether or not the appearance was fully valid or not.
 */
interface AppearanceValidationWrapper {
	/** The resulting appearance after validation */
	appearance: Item[];
	/**
	 * Whether or not the appearance was valid. A value of false indicates that the appearance has been modified, and a
	 * remedial appearance update should be made by the target player.
	 */
	valid: boolean;
}

//#endregion

//#region Vibrating items

interface VibratingItemData extends ExtendedItemData<VibratingItemOption> {
	archetype: "vibrating";
	drawData: ExtendedItemDrawData<ElementMetaData.Vibrating>;
	/** The list of extended item options available for the item */
	options: VibratingItemOption[];
	/** The list with all groups of extended item options available for the item */
	modeSet: VibratorModeSet[];
	/** A record containing various dialog keys used by the extended item screen */
	dialogPrefix: {
		/** The dialog key for the item's load text (usually a prompt to select the type) */
		header: string;
		/** The dialogue prefix for the name of each option */
		option: string;
		/** The prefix used for dialog keys representing the item's chatroom messages when its type is changed */
		chat: string | ExtendedItemChatCallback<VibratingItemOption>;
	};
	/**
	 * A record containing functions that are run on load, click, draw, exit, and validate, with the original archetype function
	 * and parameters passed on to them. If undefined, these are ignored.
	 * Note that scripthook functions must be loaded before `Female3DCGExtended.js` in `index.html`.
	 */
	scriptHooks: ExtendedItemScriptHookStruct<VibratingItemData, VibratingItemOption>;
	chatSetting: "default";
}

/**
 * A wrapper object defining a vibrator state and intensity
 */
interface StateAndIntensity {
	/** The vibrator state */
	State: VibratorModeState;
	/** The vibrator intensity */
	Intensity: VibratorIntensity;
}

//#endregion

//#region Variable Height items

/** The function that handles applying the height setting to the character */
type VariableHeightGetHeightCallback = (
	property: ItemProperties,
) => number | null;

/** The function that handles finding the current variable height setting */
type VariableHeightSetHeightCallback = (
	property: ItemProperties,
	height: number,
	maxHeight: number,
	minHeight: number,
) => void;

/**
 * An object containing typed item configuration for an asset. Contains all of the necessary information for the item's
 * load, draw & click handlers.
 */
interface VariableHeightData extends ExtendedItemData<VariableHeightOption> {
	archetype: "variableheight";
	/** The highest Y co-ordinate that can be set  */
	maxHeight: number;
	/** The lowest Y co-ordinate that can be set  */
	minHeight: number;
	/** A record containing various dialog keys used by the extended item screen */
	dialogPrefix: {
		/** The dialog key for the item's load text (usually a prompt to select the type) */
		header: string,
		/** The prefix used for dialog keys representing the item's chatroom messages when its type is changed */
		chat: string | ExtendedItemChatCallback<VariableHeightOption>;
		/** The dialogue prefix for the name of each option */
		option: string;
	};
	scriptHooks: ExtendedItemScriptHookStruct<VariableHeightData, VariableHeightOption>;
	/** The function that handles finding the current variable height setting */
	getHeight: VariableHeightGetHeightCallback;
	/** The function that handles applying the height setting to the character */
	setHeight: VariableHeightSetHeightCallback;
	chatSetting: "default";
	drawData: ExtendedItemDrawData<ElementMetaData.VariableHeight>;
}

//#endregion

// #region TextItem

interface TextItemData extends ExtendedItemData<TextItemOption> {
	archetype: "text";
	/** A record with the maximum length for each text-based properties with an input field. */
	maxLength: TextItemRecord<number>;
	/** A record containing various dialog keys used by the extended item screen */
	dialogPrefix: {
		/** The dialog key for the item's load text (usually a prompt to select the type) */
		header: string,
		/** The prefix used for dialog keys representing the item's chatroom messages when its type is changed */
		chat: string | ExtendedItemChatCallback<TextItemOption>;
	};
	scriptHooks: ExtendedItemScriptHookStruct<TextItemData, TextItemOption>;
	chatSetting: "default";
	baselineProperty: ItemPropertiesNoArray;
	eventListeners: TextItemRecord<TextItemEventListener>;
	drawData: ExtendedItemDrawData<ElementMetaData.Text>;
	pushOnPublish: boolean;
	textNames: TextItemNames[];
	/**
	 * The font used for dynamically drawing text.
	 * Requires {@link AssetDefinition.DynamicAfterDraw} to be set.
	 */
	font: null | string;
}

// NOTE: Use the intersection operator to enforce that the it remains a `keyof ItemProperties` subtype
/** Property keys of {@link ItemProperties} with text input fields */
type TextItemNames = keyof ItemProperties & (
	"Text" | "Text2" | "Text3"
);

type TextItemRecord<T> = Partial<Record<TextItemNames, T>>;

/**
 * A callback signature for handling (throttled) text changes.
 * @param C - The character being modified
 * @param item - The item being modified
 * @param name - The property wherein the updated text should be stored
 * @param text - The new text to be assigned to the item
 */
type TextItemEventListener = (
	C: Character,
	item: Item,
	name: TextItemNames,
	text: string,
) => void;

// #endregion

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface ICommand {
	Tag: string;
	Description?: string;
	Reference?: string;
	Action?: (this: Optional<ICommand, 'Tag'>, args: string, msg: string, parsed: string[]) => void
	Prerequisite?: (this: Optional<ICommand, 'Tag'>) => boolean;
	AutoComplete?: (this: Optional<ICommand, 'Tag'>, parsed: string[], low: string, msg: string) => void;
	Clear?: false;
}

// #region Struggle Minigame

type StruggleKnownMinigames = "Strength" | "Flexibility" | "Dexterity" | "Loosen" | "LockPick";

interface StruggleMinigame {
	Setup: (C: Character, PrevItem: Item, NextItem: Item) => void;
	Draw: (C: Character) => void;
	HandleEvent?: (EventType: "KeyDown"|"Click") => void;
	DisablingCraftedProperty?: CraftingPropertyType;
}

interface StruggleCompletionData {
	Progress: number;
	PrevItem: Item;
	NextItem?: Item;
	Skill: number;
	Attempts: number;
	Interrupted: boolean;
	Auto?: boolean;
}

type StruggleCompletionCallback = (character: Character, game: StruggleKnownMinigames, data: StruggleCompletionData) => void;

// #endregion

//#region Poker Minigame

type PokerGameType = "TwoCards" | "TexasHoldem";
type PokerMode = "" | "DEAL" | "FLOP" | "TURN" | "RIVER" | "RESULT" | "END";
type PokerPlayerType = "None" | "Set" | "Character";
type PokerPlayerFamily = "None" | "Player" | "Illustration" | "Model";
type PokerHand = number[];

interface PokerAsset {
	Family: PokerPlayerFamily;
	Type: PokerPlayerType;
	Opponent: string[];
}

interface PokerPlayer {
	Type: PokerPlayerType;
	Family: PokerPlayerFamily;
	Name: string;
	Chip: number;

	/* Runtime values */
	Difficulty?: number;
	Hand?: PokerHand;
	HandValue?: number;
	Cloth?: Item;
	ClothLower?: Item;
	ClothAccessory?: Item;
	Panties?: Item;
	Bra?: Item;
	Character?: Character;
	Data?: TextCache;
	Image?: string;
	TextColor?: string;
	TextSingle?: TextCache;
	TextMultiple?: TextCache;
	Text?: string;
	WebLink?: string;
	Alternate?: number;
}

interface GamePokerParameters {
	Challenge?: string;
}

interface GameClubCardParameters {
	Deck: string[];
}

//#endregion

// #region Online Games

/**
 * Online game status values.
 *
 * @property "" - The game is in the setup phase.
 * @property "Running" - The game is currently running.
 *
 * @fix FIXME: "" should really be renamed Setup
 */
type OnlineGameStatus = "" | "Running";

interface GameLARPParameters {
	Status?: OnlineGameStatus;
	Class?: string;
	Team?: string;
	TimerDelay?: number;
	Level?: {
		Name: string;
		Level: number;
		Progress: number;
	}[];
}

interface GameLARPOption {
	Name: string;
	Odds: number;
}

interface GameMagicBattleParameters {
	Status: OnlineGameStatus;
	House: "Independent" | "NotPlaying" | "HouseMaiestas" | "HouseVincula" | "HouseAmplector" | "HouseCorporis";
	TeamType: "FreeForAll" | "House";
}

interface GameGGTSParameters {
	Level: number;
	Time: number;
	Strike: number;
	Rule: string[];
}

// #endregion

// #region Audio

type AudioSoundEffect = [string, number];

interface AudioEffect {
	/** The sound effect name */
	Name: string;

	/** The sound file, or files to choose from randomly */
	File: string | string[];
}

/**
 * Sound effect detector for chat messages.
 */
interface AudioChatAction {
	/** Is that action applicable for that chat message? */
	IsAction: (data: IChatRoomMessage) => boolean;

	/** Extracts the actual sound effect from the chat message */
	GetSoundEffect: (data: IChatRoomMessage, metadata: IChatRoomMessageMetadata) => (AudioSoundEffect | string | null);
}

// #endregion

// #region Character drawing

/**
 * A callback function used for clearing a rectangular area of a canvas
 * @param {number} x - The x coordinate of the left of the rectangle to clear
 * @param {number} y - The y coordinate of the top of the rectangle to clear
 * @param {number} w - The width of the rectangle to clear
 * @param {number} h - The height of the rectangle to clear
 */
type ClearRectCallback = (x: number, y: number, w: number, h: number) => void;

/**
 * A callback function used to draw a canvas on a canvas
 * @param {HTMLImageElement | HTMLCanvasElement} Img - The canvas to draw
 * @param {number} x - The x coordinate to draw the canvas at
 * @param {number} y - The y coordinate to draw the canvas at
 */
type DrawCanvasCallback = (
	img: HTMLImageElement | HTMLCanvasElement,
	x: number,
	y: number,
	alphaMasks?: RectTuple[],
) => void;

/**
 * A callback function used to draw an image to a canvas
 * @param {string} src - The URL of the image to draw
 * @param {number} x - The x coordinate to draw the image at
 * @param {number} y - The y coordinate to draw the image at
 * @param {RectTuple[]} [alphaMasks] - A list of alpha masks to apply to the image when drawing
 * @param {number} [opacity=1] - The opacity at which to draw the image with
 * @param {boolean} [rotate=false] - If the image should be rotated by 180 degrees
 * @param {string} [blendingMode="source-over"] - blending mode for drawing the image
 */
type DrawImageCallback = (
	src: string,
	x: number,
	y: number,
	alphasMasks: RectTuple[],
	opacity?: number,
	rotate?: boolean,
	blendingMode?: GlobalCompositeOperation,
) => void;

/**
 * A callback function used to draw a colorized image to a canvas
 * @callback drawImageColorize
 * @param {string} src - The URL of the image to draw
 * @param {number} x - The x coordinate to draw the image at
 * @param {number} y - The y coordinate to draw the image at
 * @param {string} color - The color to apply to the image
 * @param {boolean} fullAlpha - Whether or not to apply color to the entire image
 * @param {RectTuple[]} [alphaMasks] - A list of alpha masks to apply to the image when drawing
 * @param {number} [opacity=1] - The opacity at which to draw the image with
 * @param {boolean} [rotate=false] - If the image should be rotated by 180 degrees
 * @param {GlobalCompositeOperation} [blendingMode="source-over"] - blending mode for drawing the image
 */
type DrawImageColorizeCallback = (
	src: string,
	x: number,
	y: number,
	color: string,
	fullAlpha: boolean,
	alphaMasks?: RectTuple[],
	opacity?: number,
	rotate?: boolean,
	blendingMode?: GlobalCompositeOperation,
) => void;

interface CommonDrawCallbacks {
	/**
	 * A callback to clear an area of the main character canvas
	 */
	clearRect: ClearRectCallback;
	/**
	 * A callback to clear an area of the blink character canvas
	 */
	clearRectBlink: ClearRectCallback;
	/**
	 * Function used to draw a canvas on top of the normal canvas
	 */
	drawCanvas: DrawCanvasCallback;
	/**
	 * Function used to draw a canvas on top of the blink canvas
	 */
	drawCanvasBlink: DrawCanvasCallback;
	/**
	 * A callback to draw an image to the main character canvas
	 */
	drawImage: DrawImageCallback;
	/**
	 * A callback to draw an image to the blink character canvas
	 */
	drawImageBlink: DrawImageCallback;
	/**
	 * A callback to draw a colorized image to the main character canvas
	 */
	drawImageColorize: DrawImageColorizeCallback;
	/**
	 * A callback to draw a colorized image to the blink character canvas
	 */
	drawImageColorizeBlink: DrawImageColorizeCallback;
}

interface DynamicDrawingData<T extends Record<string, any> = Record<string, unknown>> {
	C: Character;
	X: number;
	Y: number;
	CA: Item;
	GroupName: AssetGroupName;
	Color: string;
	Opacity: number;
	Property: ItemProperties;
	A: Asset;
	G: string;
	AG: AssetGroup;
	L: string;
	Pose: AssetPoseName;
	LayerType: string;
	BlinkExpression: string;
	drawCanvas: DrawCanvasCallback;
	drawCanvasBlink: DrawCanvasCallback;
	AlphaMasks: RectTuple[];
	PersistentData: () => T;
}

/**
 * Drawing overrides that can be returned by a dynamic BeforeDraw function
 */
interface DynamicBeforeDrawOverrides {
	Property?: ItemProperties;
	CA?: Item;
	GroupName?: AssetGroupName;
	Color?: string;
	Opacity?: number;
	X?: number;
	Y?: number;
	LayerType?: string;
	L?: string;
	AlphaMasks?: RectTuple[];
	Pose?: AssetPoseName;
}

type DynamicDrawTextEffect = "burn";

interface DynamicScriptCallbackData<T extends Record<string, any> = Record<string, unknown>> {
	C: Character;
	Item: Item;
	PersistentData: () => T;
}

// #endregion

//#region Infiltration/Pandora

type InfiltrationMissionType = "Rescue" | "Kidnap" | "Retrieve" | "CatBurglar" | "ReverseMaid" | "Steal";

type InfiltrationTargetType = "NPC" | "USBKey" | "BDSMPainting" | "GoldCollar" | "GeneralLedger" | "SilverVibrator" | "DiamondRing" | "SignedPhoto" | "PandoraPadlockKeys";

interface InfiltrationMissionTarget {
	Type: InfiltrationTargetType;
	Name: string;
	/** Whether the target was found */
	Found?: boolean;
	/** Whether the mission failed */
	Fail?: boolean;
	/** Whether this is an Rescue NPC mission from having a Private Room character kidnapped */
	PrivateRoom?: boolean;
}

type PandoraDirection = "North" | "South" | "East" | "West";
type PandoraFloorDirection = "StairsUp" | "StairsDown" | PandoraDirection;
type PandoraFloors = "Ground" | "Second" | "Underground";

interface PandoraSpecialRoom {
	Floor: "Exit" | "Search" | "Rest" | "Paint";
}

interface PandoraBaseRoom {
	Floor: PandoraFloors;
	Background: string;
	Character: NPCCharacter[];
	Path: (PandoraBaseRoom | PandoraSpecialRoom)[];
	PathMap: PandoraBaseRoom[];
	Direction: string[];
	DirectionMap: PandoraFloorDirection[];

	/* SearchRoom */
	SearchSquare?: {
		X: number;
		Y: number;
		W: number;
		H: number;
	}[];
	ItemX?: number;
	ItemY?: number;

	/* PaintRoom */
	Graffiti?: number;
}

//#endregion

//#region Crafting items

type CraftingMode = "Slot" | "Item" | "Property" | "Lock" | "Name" | "Color";

/**
 * A struct with an items crafting-related information.
 * @see {@link Item.Craft}
 */
interface CraftingItem {
	/** The name of the crafted item. */
	Name: string;
	/** The name of the crafter. */
	MemberName?: string;
	/** The member ID of the crafter. */
	MemberNumber?: number;
	/** The custom item description. */
	Description: string;
	/** The crafted item propery. */
	Property: CraftingPropertyType;
	/** The comma-separated color(s) of the item. */
	Color: string;
	/** The name of the lock or, if absent, an empty string. */
	Lock: "" | AssetLockType;
	/** The name of the item; see {@link Asset.Name}. */
	Item: string;
	/** Whether the crafted item should be private or not. */
	Private: boolean;
	/**
	 * The type of the crafted item; only relevant for extended items and should be an empty string otherwise.
	 * @see {@link ItemProperties.Type}
	 */
	Type: string | null;
	/** An integer representing the item layering priority; see {@link ItemProperties.OverridePriority} */
	OverridePriority: number | null;
	/**
	 * A record with a select few (optional) extra item properties:
	 * * {@link ItemProperties.OverridePriority} in either its record or number form.
	 * * Properties as specified in {@link ExtendedItemData.baselineProperty}
	 *
	 * Requires BC R94Beta1 or later.
	 */
	ItemProperty?: ItemProperties | null;
}

/**
 * A currently selected struct with an items crafting-related information.
 * @see {@link Item.Craft}
 */
interface CraftingItemSelected {
	/** The name of the crafted item. */
	Name: string;
	/** The custom item description. */
	Description: string;
	/** The comma-separated color(s) of the item. */
	Color: string;
	/** The name of the crafted item. */
	Asset: Asset | null;
	/** The crafted item propery. */
	Property: CraftingPropertyType;
	/** The lock as equiped on the item or, if absent, `null`. */
	Lock: Asset | null;
	/** Whether the crafted item should be private or not. */
	Private: boolean;
	/**
	 * The type of the crafted item; only relevant for extended items and should be an empty string otherwise.
	 * Note that `null` values, which are legal for Typed extended items, *must* be converted to empty strings.
	 * @see {@link ItemProperties.Type}
	 */
	Type: string;
	/** An integer representing the item layering priority; see {@link ItemProperties.OverridePriority} */
	OverridePriority: number | null;
 }

/**
 * A struct with tools for validating {@link CraftingItem} properties.
 * @property {function} Validate - The validation function
 * @property {function} GetDefault - A function that creates default values for when the validation fails
 * @property {CraftingStatusType} - The {@link CraftingStatusType} code for when the validation fails
 */
interface CratingValidationStruct {
	Validate: (Craft: CraftingItem, Asset: Asset | null) => boolean;
	GetDefault: (Craft: CraftingItem, Asset: Asset | null) => any;
	StatusCode: CraftingStatusType;
}

//#endregion

//#region Color

/** An object defining a group of layers which can be colored together */
interface ColorGroup {
	/** The name of the color group */
	name: string;
	/** The layers contained within the color group */
	layers: AssetLayer[];
	/** The color index for the color group - this is the lowest color index of any of the layers within the color group */
	colorIndex: number;
}

/**
 * A callback function that is called when the item color UI exits
 * @param c - The character being colored
 * @param item - The item being colored
 * @param save - Whether the item's appearance changes should be saved
 */
type itemColorExitListener = (
	c: Character,
	item: Item,
	save: boolean,
) => void;

interface ItemColorStateType {
	colorGroups: ColorGroup[];
	colors: string[];
	simpleMode: boolean;
	paginationButtonX: number;
	cancelButtonX: number;
	saveButtonX: number;
	colorPickerButtonX: number;
	colorDisplayButtonX: number;
	contentY: number;
	groupButtonWidth: number;
	pageSize: number;
	pageCount: number;
	colorInputWidth: number;
	colorInputX: number;
	colorInputY: number;
	exportButtonX: number;
	importButtonX: number;
	resetButtonX: number;
	drawImport: () => Promise<string>;
	drawExport: (data: string) => Promise<void>;
}

/** A hexadecimal color code */
type HexColor = string;

/** A HSV color value */
interface HSVColor {
	H: number;
	S: number;
	V: number;
}

/** The color picker callback called when selection completes. */
type ColorPickerCallbackType = (Color: string) => void;

//#end region

// #region Log

interface LogRecord {
	Name: string;
	Group: LogGroupType;
	Value: number;
}

/** The logging groups as supported by the {@link LogRecord.Group} */
type LogGroupType = keyof LogNameType;

/** An interface mapping {@link LogRecord.Group} types to valid {@link LogRecord.Name} types */
interface LogNameType {
	Arcade: "DeviousChallenge",
	Asylum: "Committed" | "Isolated" | "ForceGGTS" | "ReputationMaxed" | "Escaped",
	BadGirl: "Caught" | "Joined" | "Stolen" | "Hide",
	Cell: "Locked" | "KeyDeposit",
	College: "TeacherKey",
	Import: "BondageCollege",
	Introduction: "MaidOpinion" | "DailyJobDone",
	LockPick: "FailedLockPick",
	LoverRule: "BlockLoverLockSelf" | "BlockLoverLockOwner",
	MagicSchool: "Mastery",
	Maid: "JoinedSorority" | "LeadSorority" | "MaidsDisabled",
	MainHall: "IntroductionDone",
	Management: "ClubMistress" | "ClubSlave" | "ReleasedFromOwner" | "MistressWasPaid",
	"NPC-Amanda": "AmandaLover" | "AmandaCollared" | "AmandaCollaredWithCurfew" | "AmandaMistress",
	"NPC-AmandaSarah": "AmandaSarahLovers",
	"NPC-Jennifer": "JenniferLover" | "JenniferCollared" | "JenniferMistress" | "JenniferCollaredWithCurfew",
	"NPC-Sarah": "SarahLover" | "SarahCollared" | "SarahCollaredWithCurfew",
	"NPC-SarahIntro": "SarahWillBePunished" | "SarahCameWithPlayer",
	"NPC-Sidney": "SidneyLover" | "SidneyMistress" | "SidneyCollared" | "SidneyCollaredWithCurfew",
	// NOTE: A number of owner rules can have arbitrary suffices, and can thus not be expressed as string literals
	OwnerRule: (
		"BlockChange"
		| "BlockTalk"
		| "BlockEmote"
		| "BlockWhisper"
		| "BlockChangePose"
		| "BlockAccessSelf"
		| "BlockAccessOther"
		| "BlockKey"
		| "BlockOwnerLockSelf"
		| "BlockRemote"
		| "BlockRemoteSelf"
		| "BlockNickname"
		| "ReleasedCollar"
		| "BlockScreen"
		| "BlockAppearance"
		| "BlockItemGroup"
		| "ForbiddenWords"
		| "BlockTalkForbiddenWords"
		| string
	),
	Pony: "JoinedStable",
	PonyExam: "JoinedStable",
	PrivateRoom: (
		"RentRoom"
		| "Expansion"
		| "SecondExpansion"
		| "Wardrobe"
		| "Cage"
		| "OwnerBeepActive"
		| "OwnerBeepTimer"
		| "Security"
		| "BedWhite"
		| "BedBlack"
		| "BedPink"
	),
	Rule: "BlockChange" | "LockOutOfPrivateRoom" | "BlockCage" | "SleepCage",
	Sarah: "KidnapSophie",
	Shibari: "Training",
	SkillModifier: "ModifierDuration" | "ModifierLevel",
	SlaveMarket: "Auctioned",
	Trainer: "JoinedStable",
	TrainerExam: "JoinedStable",
}

// #end region

// #region dialog

interface FavoriteState {
	TargetFavorite: boolean;
	PlayerFavorite: boolean;
	Icon: FavoriteIcon;
	UsableOrder: DialogSortOrder;
	UnusableOrder: DialogSortOrder;
}

interface DialogInventoryItem extends Item {
	Worn: boolean;
	Icons: InventoryIcon[];
	SortOrder: string;
	Vibrating: boolean;
}

interface DialogSelfMenuOptionType {
	Name: string;
	IsAvailable: () => boolean;
	Load?: () => void;
	Draw: () => void;
	Click: () => void;
}

// #end region

// #region Notification

type NotificationAudioType = 0 | 1 | 2;
type NotificationAlertType = 0 | 1 | 3 | 2;
type NotificationEventType = "ChatMessage" | "ChatJoin" | "Beep" | "Disconnect" | "Test" | "Larp";

interface NotificationSetting {
	AlertType: NotificationAlertType,
	Audio: NotificationAudioType,
}

interface NotificationData {
	body?: string,
	character?: Character,
	useCharAsIcon?: boolean,
	memberNumber?: number,
	characterName?: string,
	chatRoomName?: string,
}

// #end region

// #region preference

interface ActivityEnjoyment {
	/** The relevant activity type */
	Name: ActivityName,
	/** The arousal factor for when the activity is performed on the player character */
	Self: ArousalFactor,
	/** The arousal factor for when the activity is performed on someone else */
	Other: ArousalFactor,
}

interface ArousalZone {
	/** The relevant zone */
	Name: AssetGroupName,
	/** The arousal factor associated with the zone */
	Factor: ArousalFactor,
	/** Whether one can orgasm from stimulating the zone */
	Orgasm: boolean,
}

interface ArousalFetish {
	/** The name of the fetish */
	Name: FetishName,
	/** The arousal factor associated with the fetish */
	Factor: ArousalFactor,
}

/** The factor of the sexual activity (0 is horrible, 2 is normal, 4 is great) */
type ArousalFactor = 0 | 1 | 2 | 3 | 4;

interface ArousalSettingsType {
	Active: ArousalActiveName;
	Visible: ArousalVisibleName;
	ShowOtherMeter: boolean;
	AffectExpression: boolean;
	AffectStutter: ArousalAffectStutterName;
	VFX: SettingsVFXName;
	VFXVibrator: SettingsVFXVibratorName;
	VFXFilter: SettingsVFXFilterName;
	Progress: number;
	ProgressTimer: number;
	VibratorLevel: number;
	ChangeTime: number;
	Activity: ActivityEnjoyment[];
	Zone: ArousalZone[];
	Fetish: ArousalFetish[];
	OrgasmTimer?: number;
	OrgasmStage?: number;
	OrgasmCount?: number;
	DisableAdvancedVibes: boolean;
}

// #end region

// #region fortune wheel

/** A union of valid wheel of fortune button colors */
type WheelFortuneColor = "Blue" | "Gold" | "Gray" | "Green" | "Orange" | "Purple" | "Red" | "Yellow";

/** Base type for fortune wheel options */
interface WheelFortuneOptionType {
    /** A single-character UTF16 string with the option's ID */
    ID: string;
    /** The color of the option button */
    Color: WheelFortuneColor;
    /** An optional script that will be executed whenever the option is picked */
    Script?: () => void;
}

// #end region

interface ClubCard {
	ID: number;
	Name: string;
	Type?: string;
	Title?: string;
	Text?: string;
	Unique?: boolean;
	MoneyPerTurn?: number;
	FamePerTurn?: number;
	RequiredLevel?: number;
	ExtraTime?: number;
	ExtraDraw?: number;
	ExtraPlay?: number;
	Group?: any[];
	Location?: string;
	GlowTimer?: number;
	GlowColor?: string;
	OnPlay?: (C: ClubCardPlayer) => void;
	OnTurnEnd?: (C: ClubCardPlayer) => void;
	CanPlay?: (C: ClubCardPlayer) => boolean;
}

interface ClubCardPlayer {
	Character: Character;
	Control: string;
	Index: number;
	Sleeve: string;
	Deck: ClubCard[];
	FullDeck: ClubCard[];
	Hand: ClubCard[];
	Board: ClubCard[];
	Level: number;
	Money: number;
	Fame: number;
	LastFamePerTurn?: number;
	LastMoneyPerTurn?: number;
}

// #region drawing

/** Drawing options for an item's preview box */
interface PreviewDrawOptions {
	/** The character using the item (used to calculate dynamic item descriptions/previews) */
	C?: Character;
	/** The preview box description. */
	Description?: string;
	/** The background color to draw the preview box in - defaults to white */
	Background?: string;
	/** The foreground (text) color to draw the description in - defaults to black */
	Foreground?: string;
	/** Whether or not to add vibration effects to the item - defaults to false */
	Vibrating?: boolean;
	/** Whether or not to draw a border around the preview box */
	Border?: boolean;
	/** Whether or not the button should enable hover behavior (background color change) */
	Hover?: boolean;
	/** The background color that should be used on mouse hover, if any */
	HoverBackground?: string;
	/** Whether or not the element is disabled (prevents hover functionality) */
	Disabled?: boolean;
	/** A list of images to draw in the top-left of the preview box */
	Icons?: readonly InventoryIcon[];
	/** The crafted properties of the item */
	Craft?: CraftingItem;
	/** The width of the preview rectangle */
	Width?: number;
	/** The height of the preview rectangle */
	Height?: number;
}

// #end region
