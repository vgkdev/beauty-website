import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GiShoppingBag } from "react-icons/gi";
import { NavSingle } from "./navSingle";
import { Link } from "react-router-dom";
import "./cart.css";
import { Image } from "@chakra-ui/react";
import skinCareIcon from "../../assets/images/skincare-icon.jpg";
import { TbVaccineBottle } from "react-icons/tb";
export const BottomNav = (props) => {
  const { serumProducts, skinProducts, cleanProducts, personalProducts } =
    props;

  const [navDropDown, setnavDropDown] = useState(false);
  const [dropDownSerum, setDropDownSerum] = useState(false);
  const [dropDownSkin, setDropDownSkin] = useState(false);
  const [dropDownClean, setDropDownClean] = useState(false);
  const [dropDownPersonalCare, setDropDownPersonalCare] = useState(false);

  const [makeup, setMakeup] = useState(false);
  const [skin, setSkin] = useState(false);
  const [clean, setClean] = useState(false);
  const [pcare, setPcare] = useState(false);
  const [mom, setmom] = useState(false);
  const [frag, setFrag] = useState(false);
  const [ayurveda, setAyurveda] = useState(false);
  const [brand, setBrand] = useState(false);
  const restState = [
    setSkin,
    setClean,
    setPcare,
    setmom,
    setFrag,
    setAyurveda,
    setBrand,
  ];
  const makeupArr = [
    {
      FACE: [
        "BB creame",
        "Blush",
        "Bronzer",
        "CC Cream",
        "Contour",
        "Concealer",
        "Compact & Powder",
        "Face Primer",
        "Foundation",
        "Highlighters",
        "Loose Powder",
        "Makeup Kits",
        "Makeup Remover",
        "Setting Spray",
      ],
    },
    {
      EYE: [
        "Contact Lenses",
        "Eye Kit",
        "Eyeliner",
        "Eye Shadow",
        "Eye Primer",
        "Eye-Palettes",
        "Eye Makeup Remover",
        "Eye Brow Enhancers",
        "False Eyelashes",
        "Kajal",
        "Mascara",
        "Under Eye Concealer",
      ],
    },
  ];
  const skinArr = [
    {
      "EYE CARE": [
        "Dark Circles",
        "Eye Contour Care",
        "Eye Cream",
        "Eye Masks",
        "Eye Serums",
        "Puffiness",
        "Under Eye Creams",
        "Under Eye Wrinkles",
      ],
    },
    {
      "FACE CARE": [
        "Anti- Ageing Creams",
        "Bleach Creams",
        "Brightening Cream",
        "Face Wash",
        "Facial Wipes",
        "Face Oil",
        "Face Cleansers",
        "Facial Kits",
        "Face Tools",
        "Moisturizer",
        "Mask & Peels",
        "Serum",
        "Toner & Astringents",
      ],
    },
    {
      "BODY CARE": [
        "All Cream",
        "Body Moisturizers",
        "Body Toners",
        "Body Sun Care",
        "Brightening Lotion",
        "Dark Circles & Wrinkles",
        "Day Cream",
        "Foot Cream",
        "Clean Remover Cream",
        "Hand Creams",
        "Hands & Feet",
        "Kits & Combos",
        "Night Cream",
        "Neck Creams",
      ],
    },
  ];
  const cleanArr = [
    {
      "HAIR CARE": [
        "Color Protection",
        "Dandruff",
        "Dry Shampoo",
        "Gels & Waxes",
        "Clean Spray",
        "Clean Color/ Dye",
        "Clean Creams & Masks ",
        "Clean Styling",
        "Cleanfall & Thinning ",
        "Straighteners ",
      ],
    },
    {
      "HAIR LOSS": [
        "Conditioner",
        "Clean Oil",
        "Clean Serum",
        "Clean Growth Solutions",
        "Shampoo",
      ],
    },
  ];
  const personalcare = [
    {
      "BATH & BODY": [
        "Body Cleansers",
        "Body Massage Oil",
        "Body Wash",
        "Creams",
        "Essential Oils",
        "Foot Cream",
        "Scrubs & Exfoliants",
        "Ubtan & Face Packs",
      ],
    },
    {
      "BATHING ACCESSORIES": [
        "Bath Brushes",
        "Loofahs",
        "Shower Caps",
        "Sponges",
      ],
    },
    { "BATH & SHOWER": ["Body Soaps", "Shower Gel"] },
  ];
  const mombabyArr = [
    {
      "BABY CARE": [
        "Bath Time",
        "Diapers",
        "Lotions & Creams",
        "Oils",
        "Powder",
        "Shampoo",
        "Soaps",
        "Sterilizer & Cleaners",
        "Rash Cream",
        "Wipes",
      ],
    },
    { "MOM CARE": ["Lotions & Creams", "Personal Care"] },
  ];
  const ayurvedaArr = [
    {
      "NATURAL SKIN CARE": [
        "Body Wash",
        "Body Lotion",
        "Cleansers",
        "Cream",
        "Eye Care",
        "Face Wash",
        "Gel",
        "Lip Care",
        "Mask",
        "Pack",
        "Scrub",
        "Sun Protection",
      ],
    },
    {
      "NATURAL HAIR CARE": [
        "Conditioner",
        "Clean Oils",
        "Clean Serum",
        "Clean Gel",
        "Shampoo",
      ],
    },
  ];
  const fragrances = [
    { "": ["Perfumes", "Deodorants roll ons", "Body Mist/Spray"] },
  ];
  const brands = [{ "": [] }];
  return (
    <div id="bottom_nav">
      {/* menu */}
      <div id="nav_content">
        <div
          onMouseEnter={() => {
            setDropDownSerum(true);
            setSkin(false);
            setClean(false);
            setPcare(false);
            setmom(false);
            setFrag(false);
            setAyurveda(false);
            setBrand(false);
            setMakeup(true);
          }}
          onMouseLeave={() => {
            setDropDownSerum(false);
          }}
        >
          SẢN PHẨM ĐẶC TRỊ <IoIosArrowDown />
        </div>

        <div
          onMouseEnter={() => {
            setDropDownSkin(true);
            setMakeup(false);
            setClean(false);
            setPcare(false);
            setmom(false);
            setFrag(false);
            setAyurveda(false);
            setBrand(false);
            setSkin(true);
          }}
          onMouseLeave={() => {
            setDropDownSkin(false);
          }}
        >
          DƯỠNG DA <IoIosArrowDown />
        </div>

        <div
          onMouseEnter={() => {
            setDropDownClean(true);
            setMakeup(false);
            setSkin(false);
            setPcare(false);
            setmom(false);
            setFrag(false);
            setAyurveda(false);
            setBrand(false);
            setClean(true);
          }}
          onMouseLeave={() => {
            setDropDownClean(false);
          }}
        >
          LÀM SẠCH <IoIosArrowDown />
        </div>

        <div
          onMouseEnter={() => {
            setDropDownPersonalCare(true);
            setMakeup(false);
            setSkin(false);
            setClean(false);
            setmom(false);
            setFrag(false);
            setAyurveda(false);
            setBrand(false);
            setPcare(true);
          }}
          onMouseLeave={() => {
            setDropDownPersonalCare(false);
          }}
        >
          SẢN PHẨM CHỨC NĂNG <IoIosArrowDown />
        </div>

        <Link to="/cart">
          <div id="cart">
            <TbVaccineBottle /> Tất cả sản phẩm
          </div>
        </Link>

        <Link to="/cart">
          <div id="cart">
            <GiShoppingBag></GiShoppingBag> GIỎ HÀNG
          </div>
        </Link>
      </div>

      {/* {navDropDown ? (
        <>
          <NavSingle
            array={makeupArr}
            products={serumProducts}
            state={makeup}
            setState={setMakeup}
            setnav={setnavDropDown}
          />
          <NavSingle
            array={skinArr}
            products={skinProducts}
            state={skin}
            setState={setSkin}
            setnav={setnavDropDown}
          />
          <NavSingle
            array={cleanArr}
            products={cleanProducts}
            state={clean}
            setState={setClean}
            setnav={setnavDropDown}
          />
          <NavSingle
            array={personalcare}
            products={personalProducts}
            state={pcare}
            setState={setPcare}
            setnav={setnavDropDown}
          />
          <NavSingle
            array={brands}
            state={brand}
            setState={setBrand}
            setnav={setnavDropDown}
          />
        </>
      ) : null} */}

      {dropDownSerum && (
        <NavSingle
          array={makeupArr}
          products={serumProducts}
          state={makeup}
          setState={setMakeup}
          setnav={setDropDownSerum}
          path={"/serum"}
        />
      )}

      {dropDownSkin && (
        <NavSingle
          array={skinArr}
          products={skinProducts}
          state={skin}
          setState={setSkin}
          setnav={setDropDownSkin}
          path={"/skin"}
        />
      )}

      {dropDownClean && (
        <NavSingle
          array={cleanArr}
          products={cleanProducts}
          state={clean}
          setState={setClean}
          setnav={setDropDownClean}
          path={"/clean"}
        />
      )}

      {dropDownPersonalCare && (
        <NavSingle
          array={personalcare}
          products={personalProducts}
          state={pcare}
          setState={setPcare}
          setnav={setDropDownPersonalCare}
          path={"/personal-care"}
        />
      )}
    </div>
  );
};
