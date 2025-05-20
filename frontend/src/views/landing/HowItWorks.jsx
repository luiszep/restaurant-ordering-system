import { Upload, QrCode, Bell } from 'lucide-react'; // You can swap icons later if preferred

export default function HowItWorks() {
  return (
    <section className="bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-green-500 p-4 rounded-full mb-4">
              <Upload className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Your Menu</h3>
            <p className="text-gray-300 max-w-xs">
              Digitize your menu in minutes using our simple AI-powered interface.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="bg-green-500 p-4 rounded-full mb-4">
              <QrCode className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Place QR Codes</h3>
            <p className="text-gray-300 max-w-xs">
              Place sleek, scannable QR codes on tables and let guests self-order.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-green-500 p-4 rounded-full mb-4">
              <Bell className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Orders Instantly</h3>
            <p className="text-gray-300 max-w-xs">
              Orders appear live in your system — no hardware or extra steps required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
