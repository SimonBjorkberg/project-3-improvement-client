import businessIcon from '../../icons/businessIcon.png'
import vehicleIcon from '../../icons/vehicleIcon.png'
import furnitureIcon from '../../icons/furnitureIcon.png'
import clothingIcon from '../../icons/clothingIcon.png'
import electronicsIcon from '../../icons/electronicsIcon.png'
import residenceIcon from '../../icons/residenceIcon.png'

function Categories() {
  return (
    <div className="max-w-[676px] mx-auto mt-10">
      <h1 className='font-bold text-xl text-left ml-3 mb-5'>Browse our categories</h1>
      <div className="grid gap-2 grid-cols-8 font-light text-sm">
        <div className="flex flex-col text-center hover:cursor-pointer h-fit w-16">
          <div className='w-12 h-12 rounded-full bg-neutral-300 mx-auto hover:scale-105 transition-all duration-100'>
            <img src={vehicleIcon} alt="" className="mx-auto p-2" />
          </div>
          <p>Vehicles</p>
        </div>
        <div className="flex flex-col text-center hover:cursor-pointer h-fit w-16">
          <div className='w-12 h-12 rounded-full bg-neutral-300 mx-auto hover:scale-105 transition-all duration-100'>
            <img src={furnitureIcon} alt="" className="mx-auto p-2" />
          </div>
          <p>Furniture</p>
        </div>
        <div className="flex flex-col text-center hover:cursor-pointer h-fit w-16">
          <div className='w-12 h-12 rounded-full bg-neutral-300 mx-auto hover:scale-105 transition-all duration-100'>
            <img src={residenceIcon} alt="" className="mx-auto p-2" />
          </div>
          <p>Residence</p>
        </div>
        <div className="flex flex-col text-center hover:cursor-pointer h-fit w-16">
          <div className='w-12 h-12 rounded-full bg-neutral-300 mx-auto hover:scale-105 transition-all duration-100'>
            <img src={clothingIcon} alt="" className="mx-auto p-2" />
          </div>
          <p>Clothing</p>
        </div>
        <div className="flex flex-col text-center hover:cursor-pointer h-fit w-16">
          <div className='w-12 h-12 rounded-full bg-neutral-300 mx-auto hover:scale-105 transition-all duration-100'>
            <img src={electronicsIcon} alt="" className="mx-auto p-2 w-4/5 h-full" />
          </div>
          <p>Electronics</p>
        </div>
        <div className="flex flex-col text-center hover:cursor-pointer h-fit w-16">
          <div className='w-12 h-12 rounded-full bg-neutral-300 mx-auto hover:scale-105 transition-all duration-100'>
            <img src={residenceIcon} alt="" className="mx-auto p-2" />
          </div>
          <p>Sports & Hobbies</p>
        </div>
        <div className="flex flex-col text-center hover:cursor-pointer h-fit w-16">
          <div className='w-12 h-12 rounded-full bg-neutral-300 mx-auto hover:scale-105 transition-all duration-100'>
            <img src={businessIcon} alt="" className="mx-auto p-2" />
          </div>
          <p>Business Related</p>
        </div>
        <div className="flex flex-col text-center hover:cursor-pointer h-fit w-16">
          <div className='w-12 h-12 rounded-full bg-neutral-300 mx-auto hover:scale-105 transition-all duration-100'>
            <img src={residenceIcon} alt="" className="mx-auto p-2" />
          </div>
          <p>Other</p>
        </div>
      </div>
    </div>
  );
}

export default Categories;
