"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserTie, FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import FundWalletModal from "@/components/FundWalletModal";
import Modal from "@/components/Modal";
import WittyTechLogo from "../../../../public/Images/WittyTechLogo.jpg";

// Nigerian States and their LGAs
const nigerianStates = {
    "Abia": ["Aba North", "Aba South", "Arochukwu", "Bende", "Ikwuano", "Isiala Ngwa North", "Isiala Ngwa South", "Isuikwuato", "Obi Ngwa", "Ohafia", "Osisioma", "Ugwunagbo", "Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South", "Umu Nneochi"],
    "Adamawa": ["Demsa", "Fufure", "Ganye", "Gayuk", "Gombi", "Grie", "Hong", "Jada", "Larmurde", "Madagali", "Maiha", "Mayo Belwa", "Michika", "Mubi North", "Mubi South", "Numan", "Shelleng", "Song", "Toungo", "Yola North", "Yola South"],
    "Akwa Ibom": ["Abak", "Eastern Obolo", "Eket", "Esit Eket", "Essien Udim", "Etim Ekpo", "Etinan", "Ibeno", "Ibesikpo Asutan", "Ibiono-Ibom", "Ika", "Ikono", "Ikot Abasi", "Ikot Ekpene", "Ini", "Itu", "Mbo", "Mkpat-Enin", "Nsit-Atai", "Nsit-Ibom", "Nsit-Ubium", "Obot Akara", "Okobo", "Onna", "Oron", "Oruk Anam", "Udung-Uko", "Ukanafun", "Uruan", "Urue-Offong/Oruko", "Uyo"],
    "Anambra": ["Aguata", "Anambra East", "Anambra West", "Anaocha", "Awka North", "Awka South", "Ayamelum", "Dunukofia", "Ekwusigo", "Idemili North", "Idemili South", "Ihiala", "Njikoka", "Nnewi North", "Nnewi South", "Ogbaru", "Onitsha North", "Onitsha South", "Orumba North", "Orumba South", "Oyi"],
    "Bauchi": ["Alkaleri", "Bauchi", "Bogoro", "Damban", "Darazo", "Dass", "Gamawa", "Ganjuwa", "Giade", "Itas/Gadau", "Jama'are", "Katagum", "Kirfi", "Misau", "Ningi", "Shira", "Tafawa Balewa", "Toro", "Warji", "Zaki"],
    "Bayelsa": ["Brass", "Ekeremor", "Kolokuma/Opokuma", "Nembe", "Ogbia", "Sagbama", "Southern Ijaw", "Yenagoa"],
    "Benue": ["Ado", "Agatu", "Apa", "Buruku", "Gboko", "Guma", "Gwer East", "Gwer West", "Katsina-Ala", "Konshisha", "Kwande", "Logo", "Makurdi", "Obi", "Ogbadibo", "Ohimini", "Oju", "Okpokwu", "Oturkpo", "Tarka", "Ukum", "Ushongo", "Vandeikya"],
    "Borno": ["Abadam", "Askira/Uba", "Bama", "Bayo", "Biu", "Chibok", "Damboa", "Dikwa", "Gubio", "Guzamala", "Gwoza", "Hawul", "Jere", "Kaga", "Kala/Balge", "Konduga", "Kukawa", "Kwaya Kusar", "Mafa", "Magumeri", "Maiduguri", "Marte", "Mobbar", "Monguno", "Ngala", "Nganzai", "Shani"],
    "Cross River": ["Abi", "Akamkpa", "Akpabuyo", "Bakassi", "Bekwarra", "Biase", "Boki", "Calabar Municipal", "Calabar South", "Etung", "Ikom", "Obanliku", "Obubra", "Obudu", "Odukpani", "Ogoja", "Yakuur", "Yala"],
    "Delta": ["Aniocha North", "Aniocha South", "Bomadi", "Burutu", "Ethiope East", "Ethiope West", "Ika North East", "Ika South", "Isoko North", "Isoko South", "Ndokwa East", "Ndokwa West", "Okpe", "Oshimili North", "Oshimili South", "Patani", "Sapele", "Udu", "Ughelli North", "Ughelli South", "Ukwuani", "Uvwie", "Warri North", "Warri South", "Warri South West"],
    "Ebonyi": ["Abakaliki", "Afikpo North", "Afikpo South", "Ebonyi", "Ezza North", "Ezza South", "Ikwo", "Ishielu", "Ivo", "Izzi", "Ohaozara", "Ohaukwu", "Onicha"],
    "Edo": ["Akoko-Edo", "Egor", "Esan Central", "Esan North-East", "Esan South-East", "Esan West", "Etsako Central", "Etsako East", "Etsako West", "Igueben", "Ikpoba Okha", "Orhionmwon", "Oredo", "Ovia North-East", "Ovia South-West", "Owan East", "Owan West", "Uhunmwonde"],
    "Ekiti": ["Ado Ekiti", "Efon", "Ekiti East", "Ekiti South-West", "Ekiti West", "Emure", "Gbonyin", "Ido Osi", "Ijero", "Ikere", "Ikole", "Ilejemeje", "Irepodun/Ifelodun", "Ise/Orun", "Moba", "Oye"],
    "Enugu": ["Aninri", "Awgu", "Enugu East", "Enugu North", "Enugu South", "Ezeagu", "Igbo Etiti", "Igbo Eze North", "Igbo Eze South", "Isi Uzo", "Nkanu East", "Nkanu West", "Nsukka", "Oji River", "Udenu", "Udi", "Uzo Uwani"],
    "FCT": ["Abaji", "Abuja Municipal", "Gwagwalada", "Kuje", "Kwali", "Kwali"],
    "Gombe": ["Akko", "Balanga", "Billiri", "Dukku", "Funakaye", "Gombe", "Kaltungo", "Kwami", "Nafada", "Shongom", "Yamaltu/Deba"],
    "Imo": ["Aboh Mbaise", "Ahiazu Mbaise", "Ehime Mbano", "Ezinihitte", "Ideato North", "Ideato South", "Ihitte/Uboma", "Ikeduru", "Isiala Mbano", "Isu", "Mbaitoli", "Ngor Okpala", "Njaba", "Nkwerre", "Nwangele", "Obowo", "Oguta", "Ohaji/Egbema", "Okigwe", "Orlu", "Orsu", "Oru East", "Oru West", "Owerri Municipal", "Owerri North", "Owerri West", "Unuimo"],
    "Jigawa": ["Auyo", "Babura", "Biriniwa", "Birnin Kudu", "Buji", "Dutse", "Gagarawa", "Garki", "Gumel", "Guri", "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Hausa", "Kaugama", "Kazaure", "Kiri Kasama", "Kiyawa", "Maigatari", "Malam Madori", "Miga", "Ringim", "Roni", "Sule Tankarkar", "Taura", "Yankwashi"],
    "Kaduna": ["Birnin Gwari", "Chikun", "Giwa", "Igabi", "Ikara", "Jaba", "Jema'a", "Kachia", "Kaduna North", "Kaduna South", "Kagarko", "Kajuru", "Kaura", "Kauru", "Kubau", "Kudan", "Lere", "Makarfi", "Sabon Gari", "Sanga", "Soba", "Zangon Kataf", "Zaria"],
    "Kano": ["Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", "Garko", "Garun Mallam", "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", "Minjibir", "Nasarawa", "Rano", "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", "Ungogo", "Warawa", "Wudil"],
    "Katsina": ["Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", "Charanchi", "Dandume", "Danja", "Dan Musa", "Daura", "Dutsi", "Dutsin Ma", "Faskari", "Funtua", "Ingawa", "Jibia", "Kafur", "Kaita", "Kankara", "Kankia", "Katsina", "Kurfi", "Kusada", "Mai'Adua", "Malumfashi", "Mani", "Mashi", "Matazu", "Musawa", "Rimi", "Sabuwa", "Safana", "Sandamu", "Zango"],
    "Kebbi": ["Aleiro", "Arewa Dandi", "Argungu", "Augie", "Bagudo", "Birnin Kebbi", "Bunza", "Dandi", "Fakai", "Gwandu", "Jega", "Kalgo", "Koko/Besse", "Maiyama", "Ngaski", "Sakaba", "Shanga", "Suru", "Wasagu/Danko", "Yauri", "Zuru"],
    "Kogi": ["Adavi", "Ajaokuta", "Ankpa", "Bassa", "Dekina", "Ibaji", "Idah", "Igalamela Odolu", "Ijumu", "Kabba/Bunu", "Kogi", "Lokoja", "Mopa Muro", "Ofu", "Ogori/Magongo", "Okehi", "Okene", "Olamaboro", "Omala", "Yagba East", "Yagba West"],
    "Kwara": ["Asa", "Baruten", "Edu", "Ekiti", "Ifelodun", "Ilorin East", "Ilorin South", "Ilorin West", "Irepodun", "Isin", "Kaiama", "Moro", "Offa", "Oke Ero", "Oyun", "Pategi"],
    "Lagos": ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe", "Eti Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"],
    "Nasarawa": ["Akwanga", "Awe", "Doma", "Karu", "Keana", "Keffi", "Kokona", "Lafia", "Nasarawa", "Nasarawa Egon", "Obi", "Toto", "Wamba"],
    "Niger": ["Agaie", "Agwara", "Bida", "Borgu", "Bosso", "Chanchaga", "Edati", "Gbako", "Gurara", "Katcha", "Kontagora", "Lapai", "Lavun", "Magama", "Mariga", "Mashegu", "Mokwa", "Moya", "Paikoro", "Rafi", "Rijau", "Shiroro", "Suleja", "Tafa", "Wushishi"],
    "Ogun": ["Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Egbado North", "Egbado South", "Ewekoro", "Ifo", "Ijebu East", "Ijebu North", "Ijebu North East", "Ijebu Ode", "Ikenne", "Imeko Afon", "Ipokia", "Obafemi Owode", "Odeda", "Odogbolu", "Ogun Waterside", "Remo North", "Shagamu"],
    "Ondo": ["Akoko North-East", "Akoko North-West", "Akoko South-East", "Akoko South-West", "Akure North", "Akure South", "Ese Odo", "Idanre", "Ifedore", "Ilaje", "Ile Oluji/Okeigbo", "Irele", "Odigbo", "Okitipupa", "Ondo East", "Ondo West", "Ose", "Owo"],
    "Osun": ["Aiyedade", "Aiyedire", "Atakunmosa East", "Atakunmosa West", "Boluwaduro", "Boripe", "Ede North", "Ede South", "Egbedore", "Ejigbo", "Ife Central", "Ife East", "Ife North", "Ife South", "Ifedayo", "Ifelodun", "Ila", "Ilesa East", "Ilesa West", "Irepodun", "Irewole", "Isokan", "Iwo", "Obokun", "Odo Otin", "Ola Oluwa", "Olorunda", "Oriade", "Orolu", "Osogbo"],
    "Oyo": ["Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda", "Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Ibarapa Central", "Ibarapa East", "Ibarapa North", "Ido", "Irepo", "Iseyin", "Itesiwaju", "Iwajowa", "Kajola", "Lagelu", "Ogbomosho North", "Ogbomosho South", "Ogo Oluwa", "Olorunsogo", "Oluyole", "Ona Ara", "Orelope", "Ori Ire", "Oyo East", "Oyo West", "Saki East", "Saki West", "Surulere"],
    "Plateau": ["Bokkos", "Barkin Ladi", "Bassa", "Jos East", "Jos North", "Jos South", "Kanam", "Kanke", "Langtang North", "Langtang South", "Mangu", "Mikang", "Pankshin", "Qua'an Pan", "Riyom", "Shendam", "Wase"],
    "Rivers": ["Abua/Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", "Andoni", "Asari-Toru", "Bonny", "Degema", "Eleme", "Emohua", "Etche", "Gokana", "Ikwerre", "Khana", "Obio/Akpor", "Ogba/Egbema/Ndoni", "Ogu/Bolo", "Okrika", "Omuma", "Opobo/Nkoro", "Oyigbo", "Port Harcourt", "Tai"],
    "Sokoto": ["Binji", "Bodinga", "Dange Shuni", "Gada", "Goronyo", "Gudu", "Gwadabawa", "Illela", "Isa", "Kebbe", "Kware", "Rabah", "Sabon Birni", "Shagari", "Silame", "Sokoto North", "Sokoto South", "Tambuwal", "Tangaza", "Tureta", "Wamako", "Wurno", "Yabo"],
    "Taraba": ["Ardo Kola", "Bali", "Donga", "Gashaka", "Gassol", "Ibi", "Jalingo", "Karim Lamido", "Kumi", "Lau", "Sardauna", "Takum", "Ussa", "Wukari", "Yorro", "Zing"],
    "Yobe": ["Bade", "Bursari", "Damaturu", "Fika", "Fune", "Geidam", "Gujba", "Gulani", "Jakusko", "Karasuwa", "Machina", "Nangere", "Nguru", "Potiskum", "Tarmuwa", "Yunusari", "Yusufari"],
    "Zamfara": ["Anka", "Bakura", "Birnin Magaji/Kiyaw", "Bukkuyum", "Bungudu", "Gummi", "Gusau", "Kaura Namoda", "Maradun", "Maru", "Shinkafi", "Talata Mafara", "Chafe", "Zurmi"]
};

export default function LicenseOnboardingPage() {
    const [formData, setFormData] = useState({
        agentLocation: "",
        agentBvn: "",
        accountName: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        alternativeEmail: "",
        phone: "",
        alternativePhone: "",
        residentialAddress: "",
        stateOfResidence: "",
        localGovernmentArea: "",
        transactionPin: ""
    });

    const [accounts, setAccounts] = useState([{ accountNumber: "", bankName: "" }]);
    const [passportImage, setPassportImage] = useState(null);
    const [passportPreview, setPassportPreview] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
    const [showFundModal, setShowFundModal] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(true);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [availableLGAs, setAvailableLGAs] = useState([]);
    const router = useRouter();

    const SIMULATED_WALLET_BALANCE = 7; // Simulate a low balance for demo
    const SERVICE_COST = 50; // License onboarding cost

    // Update LGAs when state changes
    useEffect(() => {
        if (formData.stateOfResidence) {
            setAvailableLGAs(nigerianStates[formData.stateOfResidence] || []);
            setFormData(prev => ({ ...prev, localGovernmentArea: "" }));
        } else {
            setAvailableLGAs([]);
        }
    }, [formData.stateOfResidence]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleAccountChange = (index, field, value) => {
        const newAccounts = [...accounts];
        newAccounts[index][field] = value;
        setAccounts(newAccounts);
        setError("");
    };

    const addAccount = () => {
        setAccounts([...accounts, { accountNumber: "", bankName: "" }]);
    };

    const removeAccount = (index) => {
        if (accounts.length > 1) {
            const newAccounts = accounts.filter((_, i) => i !== index);
            setAccounts(newAccounts);
        }
    };

    const handlePassportUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                setError("Please upload an image file only.");
                return;
            }

            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError("Image size should be less than 5MB.");
                return;
            }

            setPassportImage(file);
            setError("");

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPassportPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePassportImage = () => {
        setPassportImage(null);
        setPassportPreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.agentLocation.trim()) {
            setError("Agent location is required.");
            return;
        }
        if (formData.agentBvn.length !== 11) {
            setError("Agent BVN must be exactly 11 digits.");
            return;
        }
        if (!formData.accountName.trim()) {
            setError("Account name is required.");
            return;
        }
        if (!formData.firstName.trim()) {
            setError("First name is required.");
            return;
        }
        if (!formData.lastName.trim()) {
            setError("Last name is required.");
            return;
        }
        if (!formData.dateOfBirth) {
            setError("Date of birth is required.");
            return;
        }
        if (!formData.email.trim()) {
            setError("Email is required.");
            return;
        }
        if (!formData.phone.trim()) {
            setError("Phone number is required.");
            return;
        }
        if (!formData.residentialAddress.trim()) {
            setError("Residential address is required.");
            return;
        }
        if (!formData.stateOfResidence) {
            setError("State of residence is required.");
            return;
        }
        if (!formData.localGovernmentArea) {
            setError("Local government area is required.");
            return;
        }
        if (formData.transactionPin.length !== 5) {
            setError("Transaction PIN must be exactly 5 digits.");
            return;
        }
        if (!passportImage) {
            setError("Passport photograph is required.");
            return;
        }
        if (!acceptedTerms) {
            setError("You must accept the terms and conditions to proceed.");
            return;
        }

        // Validate accounts
        for (let i = 0; i < accounts.length; i++) {
            if (!accounts[i].accountNumber.trim()) {
                setError(`Account number ${i + 1} is required.`);
                return;
            }
            if (!accounts[i].bankName.trim()) {
                setError(`Bank name ${i + 1} is required.`);
                return;
            }
        }

        setSuccess(true);
        setFormData({
            agentLocation: "",
            agentBvn: "",
            accountName: "",
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            email: "",
            alternativeEmail: "",
            phone: "",
            alternativePhone: "",
            residentialAddress: "",
            stateOfResidence: "",
            localGovernmentArea: "",
            transactionPin: ""
        });
        setAccounts([{ accountNumber: "", bankName: "" }]);
        setPassportImage(null);
        setPassportPreview(null);
        setAcceptedTerms(false);
        setError("");
        setShowSuccessOverlay(true);
    };

    const handleCloseOverlay = () => {
        setShowSuccessOverlay(false);
        router.push("/dashboard");
    };

    return (
        <div className="setpin-container">
            {/* Terms and Conditions Modal */}
            <Modal open={showTermsModal} onClose={() => setShowTermsModal(false)}>
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <div style={{ marginBottom: "20px" }}>
                        <img
                            src={WittyTechLogo.src}
                            alt="WittyTech Logo"
                            style={{
                                width: 120,
                                height: 60,
                                objectFit: "contain",
                                marginBottom: "15px"
                            }}
                        />
                    </div>
                    <h2 style={{ color: "#007bff", marginBottom: "15px", fontFamily: 'LexendBold' }}>
                        Terms and Conditions
                    </h2>
                    <div style={{
                        textAlign: "left",
                        marginBottom: "20px",
                        maxHeight: "300px",
                        overflowY: "auto",
                        padding: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: "#f9f9f9"
                    }}>
                        <div style={{
                            fontFamily: 'LexendLight',
                            marginBottom: "18px",
                            fontSize: "15px",
                            lineHeight: "1.7"
                        }}>
                            <h3 style={{
                                fontFamily: 'LexendBold',
                                marginBottom: "10px",
                                color: "#007bff",
                                fontSize: "1.1em"
                            }}>
                                Consent & Authorization Agreement
                            </h3>
                            <p style={{ marginBottom: "16px" }}>
                                If you are seeing this, you are chosen as an agent for this service under the following circumstances. <br />
                                <b>Read it carefully; if you can abide by these terms, click on "I Agreed." If not, click on "Not Agreed."</b>
                            </p>
                            <ol style={{ paddingLeft: "22px", marginBottom: "0" }}>
                                <li>
                                    <b>Authorization:</b> I authorize this platform and its agents to access and use my personal data, including my NIN, to process and modify my NIN record as requested.
                                </li>
                                <li>
                                    <b>Consent:</b> I understand this platform is not affiliated with NIMC but I fully give my consent for this platform and its trusted agents to help me modify my NIN details on my behalf. This applies whether I am submitting the request myself or asking someone else (an agent) to do it for me.
                                </li>
                                <li>
                                    <b>NIMC Recommendation:</b> NIMC recommends that NIN modifications be done personally by the NIN owner using their own device. However, by using this platform, you confirm that due to illiteracy or difficulty using the official portal, you voluntarily authorize us to proceed with the modification on your behalf, despite NIMC's guideline.
                                </li>
                                <li>
                                    <b>Authority:</b> You confirm that you are either the NIN owner or have full consent and authorization from the NIN owner to act on their behalf, regardless of the device being used.
                                </li>
                                <li>
                                    <b>Future Compliance:</b> If in the future, NIMC enforces a rule that modifications must strictly be done on the owner's device, this platform may no longer be able to process such requests unless compliant access is available.
                                </li>
                                <li>
                                    <b>Service Fee:</b> I agree to pay the platform fixed service fee and authorize the platform to use any method or technology necessary to complete my modification, including uploading any document the platform wishes.
                                </li>
                                <li>
                                    <b>Alias Emails:</b> This platform uses alias email addresses for all modifications. If I prefer to use my own email, I must request an email update directly from NIMC after the modification is complete. If login credentials are provided upon request, I agree to use them exactly as given and understand that I must initiate a delinking request with NIMC if I intend to use the account on a different device. Any unauthorized changes that may compromise the account are strictly prohibited, and the platform bears no responsibility for any resulting issues.
                                </li>
                                <li>
                                    <b>Update Delays:</b> Modifications reflect immediately on the NIMC and immigration portal, but banks and SIM providers may delay syncing. If I need updates urgently for banking, I understand I should not proceed.
                                </li>
                                <li>
                                    <b>Non-Withdrawal Policy:</b> Wallet funds are non-withdrawable. This platform is designed for agents using it as part of their business, not as a banking tool.
                                </li>
                                <li>
                                    <b>Failed Services:</b> If a service fails, the payment is refunded to my wallet but still cannot be withdrawn.
                                </li>
                                <li>
                                    <b>No Double Submission:</b> I will not submit the same request on another platform while it is being processed here. Doing so forfeits my payment due to processing costs.
                                </li>
                                <li>
                                    <b>Third-Party Authorization:</b> If I am submitting on behalf of someone else, I confirm that the NIN owner has authorized me to access and request modification of their details.
                                </li>
                                <li>
                                    <b>Scope:</b> This agreement applies to all past, current, and future modification requests submitted through this platform.
                                </li>
                                <li>
                                    <b>Bank/Sim Update:</b> When we make changes to your NIN, these updates are immediately reflected in the NIMC database and the immigration portal. However, please be aware that banks and SIM card providers do not read real-time information; they save records, and it takes a longer time for these updates to be reflected in their systems. If you are modifying your NIN primarily for bank purposes and cannot afford to wait for these updates, we advise you not to proceed with the modification at this time.
                                </li>
                                <li>
                                    <b>Delays/Network Issues:</b> If there is a delay, issue, or network failure from NIMC, I agree to wait patiently until NIMC resolves the issue. I understand that submitting during such periods may result in failure, and I should not send new requests until the issue is fixed.
                                </li>
                            </ol>
                        </div>
                        <button
                            className="btn-primary"
                            onClick={() => setShowTermsModal(false)}
                            style={{ minWidth: "120px", marginTop: "18px" }}
                        >
                            I Understand
                        </button>
                    </div>
                </div>
            </Modal>

            <div className="service-header sleek-service-header">
                <div className="service-header-icon"><FaUserTie size={32} color="#007bff" /></div>
                <div>
                    <h1 className="service-title">License Onboarding</h1>
                    <div className="service-desc">Complete your license onboarding by providing all required information.</div>
                </div>
            </div>
            <div className="service-cost-row">
                <span>Service Cost: </span>
                <span className="service-cost-value">$50</span>
            </div>
            {SIMULATED_WALLET_BALANCE < SERVICE_COST && (
                <div className="verifynin-alert">
                    Your account is too low, please fund wallet and try again!!!
                    <button
                        type="button"
                        className="btn-fund"
                        onClick={() => setShowFundModal(true)}
                    >
                        Fund Wallet
                    </button>
                </div>
            )}
            <form className="setpin-form" onSubmit={handleSubmit}>
                {/* Agent Information */}
                <div className="ninvalidation-row">
                    <div className="setpin-field">
                        <label>Agent Location</label>
                        <input
                            type="text"
                            name="agentLocation"
                            placeholder="Enter Agent Location"
                            value={formData.agentLocation}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="setpin-field">
                        <label>Agent BVN</label>
                        <input
                            type="text"
                            name="agentBvn"
                            placeholder="Enter Agent BVN"
                            value={formData.agentBvn}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                setFormData(prev => ({ ...prev, agentBvn: value }));
                                setError("");
                            }}
                            maxLength={11}
                            required
                        />
                        {formData.agentBvn.length > 0 && formData.agentBvn.length < 11 && (
                            <div className="verifynin-subtext">
                                <p style={{ color: 'red', fontFamily: 'LexendLight' }}>
                                    <b>Note:</b> BVN must be exactly 11 digits.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Account Information */}
                <div className="ninvalidation-row">
                    <div className="setpin-field">
                        <label>Account Name</label>
                        <input
                            type="text"
                            name="accountName"
                            placeholder="Enter Account Name"
                            value={formData.accountName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                {/* Dynamic Account Numbers and Bank Names */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>
                        Account Numbers and Bank Names
                    </label>
                    {accounts.map((account, index) => (
                        <div key={index} className="ninvalidation-row" style={{ marginBottom: '10px' }}>
                            <div className="setpin-field">
                                <input
                                    type="text"
                                    placeholder="Account Number"
                                    value={account.accountNumber}
                                    onChange={(e) => handleAccountChange(index, 'accountNumber', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="setpin-field">
                                <input
                                    type="text"
                                    placeholder="Bank Name"
                                    value={account.bankName}
                                    onChange={(e) => handleAccountChange(index, 'bankName', e.target.value)}
                                    required
                                />
                            </div>
                            {accounts.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeAccount(index)}
                                    style={{
                                        background: '#ff4444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '8px 12px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px'
                                    }}
                                >
                                    <FaTrash size={14} />
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addAccount}
                        style={{
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            marginTop: '10px'
                        }}
                    >
                        <FaPlus size={14} />
                        Add Another Account
                    </button>
                </div>

                {/* Passport Upload */}
                <div className="ninvalidation-row">
                    <div className="setpin-field">
                        <label>Passport Photograph</label>
                        <div style={{
                            border: '2px dashed #ddd',
                            borderRadius: '8px',
                            padding: '20px',
                            textAlign: 'center',
                            backgroundColor: '#f9f9f9',
                            position: 'relative'
                        }}>
                            {passportPreview ? (
                                <div>
                                    <img
                                        src={passportPreview}
                                        alt="Passport Preview"
                                        style={{
                                            maxWidth: '200px',
                                            maxHeight: '200px',
                                            borderRadius: '8px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <div>
                                        <button
                                            type="button"
                                            onClick={removePassportImage}
                                            style={{
                                                background: '#ff4444',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                padding: '8px 16px',
                                                cursor: 'pointer',
                                                marginRight: '10px'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <FaUpload size={40} color="#007bff" style={{ marginBottom: '10px' }} />
                                    <p style={{ marginBottom: '10px', color: '#666' }}>
                                        Click to upload passport photograph
                                    </p>
                                    <p style={{ fontSize: '12px', color: '#999' }}>
                                        Only image files allowed (JPG, PNG, GIF). Max size: 5MB
                                    </p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePassportUpload}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            opacity: 0,
                                            cursor: 'pointer'
                                        }}
                                        required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="ninvalidation-row">
                    <div className="setpin-field">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="setpin-field">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="ninvalidation-row">
                    <div className="setpin-field">
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="setpin-field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="ninvalidation-row">
                    <div className="setpin-field">
                        <label>Alternative Email (Optional)</label>
                        <input
                            type="email"
                            name="alternativeEmail"
                            placeholder="Enter Alternative Email"
                            value={formData.alternativeEmail}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="setpin-field">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter Phone Number"
                            value={formData.phone}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                setFormData(prev => ({ ...prev, phone: value }));
                                setError("");
                            }}
                            maxLength={11}
                            required
                        />
                    </div>
                </div>

                <div className="ninvalidation-row">
                    <div className="setpin-field">
                        <label>Alternative Phone (Optional)</label>
                        <input
                            type="text"
                            name="alternativePhone"
                            placeholder="Enter Alternative Phone"
                            value={formData.alternativePhone}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                setFormData(prev => ({ ...prev, alternativePhone: value }));
                                setError("");
                            }}
                            maxLength={11}
                        />
                    </div>
                </div>

                <div className="ninvalidation-row">
                    <div className="setpin-field">
                        <label>Residential Address</label>
                        <input
                            type="text"
                            name="residentialAddress"
                            placeholder="Enter Residential Address"
                            value={formData.residentialAddress}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="ninvalidation-row">
                    <div className="setpin-field">
                        <label>State of Residence</label>
                        <select
                            name="stateOfResidence"
                            value={formData.stateOfResidence}
                            onChange={handleInputChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px',
                                fontFamily: 'LexendLight'
                            }}
                        >
                            <option value="">Select State</option>
                            {Object.keys(nigerianStates).map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>
                    <div className="setpin-field">
                        <label>Local Government Area</label>
                        <select
                            name="localGovernmentArea"
                            value={formData.localGovernmentArea}
                            onChange={handleInputChange}
                            required
                            disabled={!formData.stateOfResidence}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px',
                                fontFamily: 'LexendLight',
                                opacity: formData.stateOfResidence ? 1 : 0.6
                            }}
                        >
                            <option value="">Select LGA</option>
                            {availableLGAs.map(lga => (
                                <option key={lga} value={lga}>{lga}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="ninvalidation-row">
                    <div className="setpin-field">
                        <label>Transaction PIN</label>
                        <input
                            type="password"
                            name="transactionPin"
                            placeholder="Enter 5-digit Transaction PIN"
                            value={formData.transactionPin}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "").slice(0, 5);
                                setFormData(prev => ({ ...prev, transactionPin: value }));
                                setError("");
                            }}
                            maxLength={5}
                            required
                        />
                    </div>
                </div>

                {/* Terms and Conditions Checkbox */}
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <input
                            type="checkbox"
                            id="acceptTerms"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            style={{ marginTop: '3px' }}
                        />
                        <label htmlFor="acceptTerms" style={{
                            fontSize: '14px',
                            lineHeight: '1.4',
                            fontFamily: 'LexendLight',
                            cursor: 'pointer'
                        }}>
                            I agree to the{" "}
                            <a
                                href="/terms-and-conditions"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#007bff", textDecoration: "underline" }}
                            >
                                Terms and Conditions
                            </a>{" "}
                            and{" "}
                            <a
                                href="/consent-authorization"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#007bff", textDecoration: "underline" }}
                            >
                                Consent and Authorization Agreement
                            </a>
                        </label>
                    </div>
                </div>

                {error && <div className="setpin-error">{error}</div>}
                <button
                    className="btn-primary-setpin"
                    style={{
                        opacity: SIMULATED_WALLET_BALANCE < SERVICE_COST ? 0.5 : 1,
                        cursor: SIMULATED_WALLET_BALANCE < SERVICE_COST ? 'not-allowed' : 'pointer'
                    }}
                    disabled={SIMULATED_WALLET_BALANCE < SERVICE_COST}
                    type="submit"
                >
                    Submit Application
                </button>
            </form>
            {showSuccessOverlay && (
                <div className="modal-backdrop" style={{ zIndex: 3000 }}>
                    <div className="modal-content success-modal" style={{ textAlign: 'center', padding: '36px 24px', border: '2px solid #007bff' }}>
                        <button className="modal-close" onClick={handleCloseOverlay} aria-label="Close" style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: '2rem', color: '#007bff', cursor: 'pointer', lineHeight: 1, zIndex: 1 }}>&times;</button>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
                            <div style={{ background: '#eaf3ff', borderRadius: '50%', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="19" cy="19" r="19" fill="#007bff" />
                                    <path d="M11 20.5L17 26.5L27 14.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <h2 style={{ color: '#007bff', marginBottom: 10, fontFamily: 'LexendExtraBold' }}>Your license onboarding application has been successfully submitted</h2>
                        <button className="btn-primary" style={{ marginTop: 18, minWidth: 120 }} onClick={handleCloseOverlay}>Okay</button>
                    </div>
                </div>
            )}
            <FundWalletModal
                open={showFundModal}
                onClose={() => setShowFundModal(false)}
                account={{
                    bank: "Palmpay",
                    bankLogo: "/banks/gtbank.png",
                    accountNumber: "1234567890",
                    accountName: "Alex Doe"
                }}
            />
        </div>
    );
} 