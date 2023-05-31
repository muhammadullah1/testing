const ColorBox = ({name, color, paddingx, paddingy}) => {
    return (
      <div className="text-start align-items-center ms-4 gap-4 d-flex">
        <span className="mt-2 w-50">{name}</span>
        <div className={`text-white color-icon px-${paddingx} py-${paddingy}`} style={{ backgroundColor: color}}></div>
      </div>
    );
  };
  export default ColorBox;