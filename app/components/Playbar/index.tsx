import { IoIosSkipBackward, IoIosSkipForward } from 'react-icons/io'
import { FaPlayCircle, FaVolumeDown} from 'react-icons/fa'
import { FaRepeat, FaShuffle, } from 'react-icons/fa6'
import { TbMicrophone2 } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { FiMaximize2 } from "react-icons/fi";
import "./style.css"

const Playbar = () => {
  return (
    <div className="fixed bottom-0 bg-gray-900 text-white w-full">
      <div className="mx-auto flex p-4">
        {/* Song info */}
        <div className="flex items-center w-1/4">
          <img
            src="https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa"
            alt="Album cover"
            className="w-14 h-14 mr-4 flex-shrink-0"
          />
          <div className="flex flex-col overflow-hidden">
            <div className="font-bold text-sm whitespace-nowrap overflow-hidden" style={{ maxWidth: '200px' }}>
              <div className="scrolling-text">
                Florida!! (feat Florence + the Machine)
              </div>
            </div>
            <div className="text-xs text-gray-400 whitespace-nowrap overflow-hidden" style={{ maxWidth: '200px' }}>
              <div className="scrolling-text">
                Taylor Swift, Florence and The Machine
              </div>
            </div>
          </div>
        </div>

        {/* Play bar */}
        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <button aria-label="Shuffle" className="text-gray-400 hover:text-white">
              <FaShuffle className="w-5 h-5" />
            </button>
            <button aria-label="Previous" className="text-gray-400 hover:text-white">
              <IoIosSkipBackward className="w-5 h-5" />
            </button>
            <button aria-label="Play/Pause" className="hover:scale-105 transition">
              <FaPlayCircle className="w-9 h-9" />
            </button>
            <button aria-label="Next" className="text-gray-400 hover:text-white">
              <IoIosSkipForward className="w-5 h-5" />
            </button>
            <button aria-label="Repeat" className="text-gray-400 hover:text-white">
              <FaRepeat className="w-5 h-5" />
            </button>
          </div>
          <div className="w-full flex items-center">
            <span className="text-xs text-gray-400 w-10">1:10</span>
            <div className="flex-grow mx-2 h-1 bg-gray-700 rounded-full">
              <div className="w-1/3 h-full bg-white rounded-full"></div>
            </div>
            <span className="text-xs text-gray-400 w-10">3:30</span>
          </div>
        </div>

        {/* Option buttons */}
        <div className="flex items-center justify-end space-x-4 w-1/4">
          <button aria-label="Lyrics" className="text-gray-400 hover:text-white">
            <TbMicrophone2 className="w-5 h-5" />
          </button>
          <button aria-label="Queue" className="text-gray-400 hover:text-white">
            <HiOutlineQueueList className="w-5 h-5" />
          </button>
          <button aria-label="Volume" className="text-gray-400 hover:text-white">
            <FaVolumeDown className="w-5 h-5" />
          </button>
          <div className="w-24 h-1 bg-gray-700 rounded-full">
            <div className="w-1/2 h-full bg-white rounded-full"></div>
          </div>
          <button aria-label="Full screen" className="text-gray-400 hover:text-white">
            <FiMaximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Playbar