
    const page_1 = document.getElementById('page1');
    const page_2 = document.getElementById('page2');
    const page_3 = document.getElementById('page3');
    const page_4 = document.getElementById('page4');
    // const page_5 = document.getElementById('page5');
    // const page_6 = document.getElementById('page6');
    // const page_7 = document.getElementById('page7');
    // const page_8 = document.getElementById('page8')
    async function getThePage() {
        const res = await fetch('./page1.html');
        const res1 = await fetch('./page2.html')
        const res2 = await fetch('./page3.html')
        const res3 = await fetch('./page4.html')
        // const res4 = await fetch('./page5.html')
        // const res5 = await fetch('./page6.html')
        // const res6 = await fetch('./page7.html')
        // const res7 = await fetch('./page8.html')
        
        const html = await res.text();
        const html1 = await res1.text();
        const html2 = await res2.text();
        const html3 = await res3.text();
        // const html4 = await res4.text();
        // const html5 = await res5.text();
        // const html6 = await res6.text();
        // const html7 = await res7.text();
        page_1.innerHTML = html;
        page_2.innerHTML = html1
        page_3.innerHTML = html2
        page_4.innerHTML = html3
        // page_5.innerHTML = html4
        // page_6.innerHTML = html5
        // page_7.innerHTML = html6
        // page_8.innerHTML = html7
        // ✅ Now that content is loaded, run your setup logic
        setupPage1Events();
        setupPage2Events();

    }

    getThePage();

    // Global event listener as backup for consent affidavit button
  

    function setupPage1Events() {
       
        // Deceased alias toggle
        const alias_button = document.getElementById('deceased_alias');
        const alias_box = document.getElementById('alias_container');
        const remove_button = document.getElementById('remove_deceased_alias');

        if (alias_button && remove_button) {
            alias_button.addEventListener('click', function (e) {
                e.preventDefault();
                alias_box.classList.remove('hidden');
                alias_button.classList.add('hidden');
            });

            remove_button.addEventListener('click', function (e) {
                e.preventDefault();
                alias_box.classList.add('hidden');
                alias_button.classList.remove('hidden');
            });
        }

        // page 1 modal button
        const death_first_question_close = document.getElementById('death_first_question_close');
        const first_question_yes_modal = document.getElementById('first_question_yes');
        const first_question_no_modal = document.getElementById('first_question_no');
        const death_first_question = document.getElementById('death_first_question');
        const second_question_back_button = document.getElementById('second_question_back')
        const second_question_yes = document.getElementById('second_question_yes')
        const second_question_no_button = document.getElementById('second_question_no')
        const rest_button  = document.getElementById("address_reset")
        const modal1 = document.getElementById("death_first_question")
        const modal2 = document.getElementById("death_second_question")
        const and = document.getElementById("and")


        const place_of_death_input = document.getElementById('place_of_death')
        const death_cer_address_input = document.getElementById('death_cer_address')
        const address_box = document.getElementById('ad')
        const show_both_line_box = document.getElementById('show_both_line')
        const died_text = document.getElementById("who")
          const death_second_question_close_box = document.getElementById('death_second_question_close');
        document.getElementById('address_des_button').addEventListener('click',(e)=>{
            e.preventDefault()
           modal1.classList.remove("hidden")
        })
        
            // yes yes model
            first_question_yes_modal.addEventListener("click",(e)=>{
                e.preventDefault()
                // console.log(e.target.dataset.action)
                
                    modal1.classList.add("hidden")
                    modal2.classList.remove("hidden")
                    second_question_yes.addEventListener("click",(e)=>{
                        e.preventDefault()
                        modal2.classList.add("hidden")
                        place_of_death_input.classList.remove("hidden")
                        des_button.classList.add("hidden")
                        death_cer_address_input.classList.remove('hidden')
                        address_box.classList.remove('hidden')
                        show_both_line_box.classList.remove('hidden')
                        rest_button.classList.remove("hidden")
                    })

                    second_question_no_button.addEventListener("click",(e)=>{
                        e.preventDefault()
                        modal2.classList.add("hidden")
                        des_button.classList.add("hidden")
                       // died_text.classList.add("hidden")
                        place_of_death_input.classList.remove("hidden")
                        address_box.classList.remove('hidden')
                        rest_button.classList.remove("hidden")
                        and.classList.remove("hidden")
                    })
                        
                    })
                
                    first_question_no_modal.addEventListener("click", (e)=>{
                        e.preventDefault()
                        modal1.classList.add("hidden")
                        modal2.classList.remove("hidden")
                        second_question_yes.addEventListener("click",(e)=>{
                            e.preventDefault()
                            modal2.classList.add("hidden")
                            
                            des_button.classList.add("hidden")
                            death_cer_address_input.classList.remove('hidden')
                            address_box.classList.remove('hidden')
                            show_both_line_box.classList.remove('hidden')
                            rest_button.classList.remove("hidden")
                        })
                        second_question_no_button.addEventListener("click",(e)=>{
                            e.preventDefault()
                            modal2.classList.add("hidden")
                            des_button.classList.add("hidden")
                            died_text.classList.add("hidden")
                            rest_button.classList.remove("hidden")
                            place_of_death_input.classList.add("hidden")
                            address_box.classList.remove('hidden')
                            
                        })
                        
                    })
                
                rest_button.addEventListener("click" , (e)=>{
                    e.preventDefault()
                    
                    place_of_death_input.classList.add("hidden")
                    des_button.classList.remove("hidden")
                    death_cer_address_input.classList.add('hidden')
                    address_box.classList.add('hidden')
                    show_both_line_box.classList.add('hidden')
                    rest_button.classList.add("hidden")
                })
        
                    
                second_question_back_button.addEventListener("click",(e)=>{
                    e.preventDefault()
                    modal2.classList.add("hidden")
                    modal1.classList.remove("hidden")
                })
                death_second_question_close_box.addEventListener("click",(e)=>{
                    e.preventDefault()
                    modal2.classList.add("hidden")
                })

                death_first_question_close.addEventListener("click",(e)=>{
                    e.preventDefault()
                    modal1.classList.add("hidden")
                })
            // const showModal = (id)=>{
            // document.querySelectorAll('.model').forEach(model => console.log("showing"))
            //  document.getElementById(id).classList.remove("hidden")
            // }








       
        const des_button = document.getElementById('address_des_button');
       
        // Petitioner add/remove
        const addPetitionerBtn = document.getElementById("add_petitioner_button");
        const petitionerWrapper = document.getElementById("petitioner_wrapper");

        if (addPetitionerBtn && petitionerWrapper) {
            addPetitionerBtn.addEventListener("click", () => {
                const lastBlock = petitionerWrapper.querySelector(".petitioner_block:last-child");
                const newBlock = lastBlock.cloneNode(true);

                // Reset values
                newBlock.querySelectorAll("input, select, textarea").forEach((el) => {
                    el.value = "";
                    if (el.tagName === "SELECT") el.selectedIndex = 0;
                });

                newBlock.classList.add("border-t", "border-dashed", "border-black", "mt-4", "pt-4");

                // Petitioner number
                const allBlocks = petitionerWrapper.querySelectorAll(".petitioner_block");
                const numberSpan = newBlock.querySelector(".petitioner_number");
                if (numberSpan) numberSpan.textContent = `${allBlocks.length + 1}.`;

                // Remove button
                const oldRemoveBtn = newBlock.querySelector(".remove_petitioner_btn");
                if (oldRemoveBtn) oldRemoveBtn.remove();

                const removeBtn = document.createElement("button");
                removeBtn.className = "remove_petitioner_btn bg-gray-500 text-white px-3 py-1 rounded mt-3 ml-2";
                removeBtn.textContent = "Remove Petitioner";
                removeBtn.onclick = () => {
                    newBlock.remove();
                    updatePetitionerNumbers();
                };

                newBlock.appendChild(removeBtn);
                petitionerWrapper.appendChild(newBlock);
                updatePetitionerNumbers();
            });

            function updatePetitionerNumbers() {
                const blocks = petitionerWrapper.querySelectorAll(".petitioner_block");
                blocks.forEach((block, index) => {
                    const numberSpan = block.querySelector(".petitioner_number");
                    if (numberSpan) numberSpan.textContent = `${index + 1}.`;

                    let removeBtn = block.querySelector(".remove_petitioner_btn");
                    if (!removeBtn && index > 0) {
                        removeBtn = document.createElement("button");
                        removeBtn.className = "remove_petitioner_btn bg-gray-500 text-white px-3 py-1 rounded mt-3 ml-2";
                        removeBtn.textContent = "Remove Petitioner";
                        removeBtn.onclick = () => {
                            block.remove();
                            updatePetitionerNumbers();
                        };
                        block.appendChild(removeBtn);
                    } else if (removeBtn && index === 0) {
                        removeBtn.remove();
                    }
                });
            }
        }





        // copy text  dc address
        const dc_address_copy_button = document.getElementById("dc_address_button")
        const enter_addressProof_text = document.getElementById("enter_addressProof")
        const toast = document.getElementById("toast")
        
        
        dc_address_copy_button.addEventListener("click",(e)=>{
            e.preventDefault()
            
            const dc_address = enter_addressProof_text.value
            navigator.clipboard.writeText(dc_address).then(()=>{
            
            toast.innerText = "DC ADDRESS COPY !"
            toast.classList.remove("hidden")

            setTimeout(()=>{
                toast.classList.add("hidden")
                toast.innerText = ""
            },2000)
            })

        })
       

        // copy address proof

        const address_proof_copy_button = document.getElementById("address_proof_button")
        const address_proof_input = document.getElementById("address_proof")
        address_proof_copy_button.addEventListener("click",(e)=>{
            e.preventDefault()
            const dc_address = address_proof_input.value
            navigator.clipboard.writeText(dc_address).then(()=>{
            
            toast.innerText = "Address Proof Copy"
            toast.classList.remove("hidden")

            setTimeout(()=>{
                toast.classList.add("hidden")
                toast.innerText = ""
            },2000)
            })
        })
        

    }

    // Legal Heir functionality for page 2
    let legalHeirCounter = 2; // Starting from 2 since we already have 2 rows
    let subHeirCounter = 0; // Counter for sub-heirs

    function setupPage2Events() {
        const the_proof_selector = document.getElementById('proof_select')
        const addMoreLegalHeirBtn = document.getElementById('add-more-legal-heir');
        const addSubLegalHeirBtn = document.getElementById('add-sub-legal-heir');
        const addSonBtn = document.getElementById('add-son-btn');
        the_proof_selector.addEventListener("change",(e)=>{
            if(e.target.value === "7") document.getElementById("no_proof").classList.remove("hidden")
            else document.getElementById("no_proof").classList.add("hidden")
        })

        if (addMoreLegalHeirBtn) {
            addMoreLegalHeirBtn.addEventListener('click', addMoreLegalHeir);
        }

        if (addSubLegalHeirBtn) {
            addSubLegalHeirBtn.addEventListener('click', addSubLegalHeir);
        }

        if (addSonBtn) {
            addSonBtn.addEventListener('click', addSon);
        }

        // Setup remove buttons for existing sons
        setupSonRemoveButtons();
    }

    function addMoreLegalHeir() {
        legalHeirCounter++;
        const tbody = document.querySelector('#legal-heirs-table tbody');
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td class="border border-black p-2 text-center">${legalHeirCounter}</td>
            <td class="border border-black p-2">
                <div class="space-y-2">
                    <input type="text" placeholder="Name of Legal Heir" class="w-full border input p-1 border-black rounded">
                    <input type="text" placeholder="Residing at" class="w-full border p-1 border-black input rounded">
                    <input type="text" placeholder="Address of Legal Heir" class="w-full border input p-1 border-black rounded">
                </div>
            </td>
            <td class="border border-black p-2">
                <input type="number" placeholder="Age of Legal Heir" class="w-full border p-1 border-black input rounded">
            </td>
            <td class="border border-black p-2">
                <input type="text" placeholder="Relation with deceased" class="w-full border p-1 border-black input rounded">
            </td>
            <td class="border border-black p-2 text-center">
                <button type="button" class="remove-row-btn bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Remove</button>
            </td>
        `;
        
        tbody.appendChild(newRow);
        subHeirCounter = 0; // Reset sub-heir counter when adding new main heir
        
        // Add event listener to the remove button
        const removeBtn = newRow.querySelector('.remove-row-btn');
        removeBtn.addEventListener('click', function() {
            newRow.remove();
            updateRowNumbers();
        });
    }

    function addSubLegalHeir() {
        subHeirCounter++;
        const tbody = document.querySelector('#legal-heirs-table tbody');
        const newRow = document.createElement('tr');
        
        // Get the current main heir number
        const currentMainHeir = legalHeirCounter;
        const subHeirNumber = `${currentMainHeir}(${String.fromCharCode(96 + subHeirCounter)})`; // a, b, c, etc.
        
        newRow.innerHTML = `
            <td class="border border-black p-2 text-center">${subHeirNumber}</td>
            <td class="border border-black p-2">
                <div class="space-y-2">
                    <input type="text" placeholder="Name of Sub Legal Heir" class="w-full input border p-1 border-black rounded">
                    <input type="text" placeholder="Residing at" class="w-full border p-1 border-black input rounded">
                    <input type="text" placeholder="Address of Sub Legal Heir" class="w-full border input p-1 border-black rounded">
                </div>
            </td>
            <td class="border border-black p-2">
                <input type="number" placeholder="Age of Sub Legal Heir" class="w-full border p-1 border-black input rounded">
            </td>
            <td class="border border-black p-2">
                <input type="text" placeholder="Relation with deceased" class="w-full border p-1 border-black input rounded">
            </td>
            <td class="border border-black p-2 text-center">
                <button type="button" class="remove-row-btn bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Remove</button>
            </td>
        `;
        
        tbody.appendChild(newRow);
        
        // Add event listener to the remove button
        const removeBtn = newRow.querySelector('.remove-row-btn');
        removeBtn.addEventListener('click', function() {
            newRow.remove();
            updateRowNumbers();
        });
    }

    function updateRowNumbers() {
        const tbody = document.querySelector('#legal-heirs-table tbody');
        const rows = tbody.querySelectorAll('tr');
        let mainHeirCount = 0;
        let subHeirCount = 0;
        let currentMainHeir = 0;

        rows.forEach((row, index) => {
            const firstCell = row.querySelector('td:first-child');
            const currentText = firstCell.textContent.trim();
            
            // Check if this is a main heir (just a number) or sub-heir (number with letter)
            if (/^\d+$/.test(currentText)) {
                // This is a main heir
                mainHeirCount++;
                currentMainHeir = mainHeirCount;
                subHeirCount = 0;
                firstCell.textContent = mainHeirCount;
            } else if (currentText.includes('(') && currentText.includes(')')) {
                // This is a sub-heir
                subHeirCount++;
                firstCell.textContent = `${currentMainHeir}(${String.fromCharCode(96 + subHeirCount)})`;
            }
        });

        // Update the global counters
        legalHeirCounter = mainHeirCount;
        subHeirCounter = subHeirCount;
    }

    // Sons functionality
    let sonCounter = 1; // Starting from 1 since we now have only 1 son

    function addSon() {
        sonCounter++;
        const container = document.getElementById('sons-container');
        const newSonEntry = document.createElement('div');
        
        // Get next exhibit letter
        const exhibitLetter = String.fromCharCode(65 + sonCounter); // A=65, B=66, C=67, etc.
        
        newSonEntry.className = 'son-entry border border-gray-300 p-3 rounded mb-2';
        newSonEntry.innerHTML = `
            <div class="flex items-center gap-2 mb-2">
                <span class="son-number">${sonCounter})</span>
                Master <input type="text" placeholder="Enter Son's Name" class="border p-1 border-black input rounded w-48">
                who was born on <input type="date" class="border input p-1 border-black rounded">
                <button type="button" class="remove-son-btn input bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">Remove</button>
            </div>
            <div class="flex items-center gap-2">
                Hereto annexed and marked as Exhibit – "<input type="text" placeholder="${exhibitLetter}" class="border p-1 input border-black rounded w-12">" is the true copy of birth certificate.
            </div>
        `;
        
        container.appendChild(newSonEntry);
        
        // Add event listener to the new remove button
        const removeBtn = newSonEntry.querySelector('.remove-son-btn');
        removeBtn.addEventListener('click', function() {
            newSonEntry.remove();
            updateSonNumbers();
        });
    }

    function setupSonRemoveButtons() {
        const removeButtons = document.querySelectorAll('.remove-son-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const sonEntry = button.closest('.son-entry');
                sonEntry.remove();
                updateSonNumbers();
            });
        });
    }

    function updateSonNumbers() {
        const sonEntries = document.querySelectorAll('.son-entry');
        sonEntries.forEach((entry, index) => {
            const numberSpan = entry.querySelector('.son-number');
            if (numberSpan) {
                numberSpan.textContent = `${index + 1})`;
            }
        });
        sonCounter = sonEntries.length;
    }

    // Consent Affidavit functionality for page 7
    function setupPage7Events() {
        console.log('Setting up page 7 events...');
        const appendButton = document.getElementById('append_consent_affidavit');
        const affidavitsContainer = document.getElementById('consent_affidavits_container');
        let affidavitCounter = 1;

        console.log('Append button found:', appendButton);
        console.log('Affidavits container found:', affidavitsContainer);

        if (appendButton && affidavitsContainer) {
            console.log('Adding click event listener to append button');
            appendButton.addEventListener('click', function() {
                console.log('Append button clicked!');
                const newAffidavit = document.createElement('div');
                newAffidavit.className = 'bg-[#334155] text-white p-6 rounded-lg border border-white mb-6';
                newAffidavit.innerHTML = `
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-bold">Consent Affidavit #${affidavitCounter}</h3>
                        <button type="button" class="remove-affidavit bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                    
                    <div class="bg-[#334155] text-white p-6 rounded-lg border border-white">
                        <div class="text-justify space-y-4">
                            <p><strong>1.</strong> That I know that the abovenamed <input type="text" placeholder="Enter Deceased Name" class="border bg-[#334155] text-white p-1 rounded w-48" /> deceased died at <input type="text" placeholder="Enter Place of Death" class="border bg-[#334155] text-white p-1 rounded w-48" /> on or about <input type="text" placeholder="Enter Day" class="border bg-[#334155] text-white p-1 rounded w-16" /> day of <input type="text" placeholder="Enter Month" class="border bg-[#334155] text-white p-1 rounded w-24" />, <input type="text" placeholder="Enter Year" class="border bg-[#334155] text-white p-1 rounded w-20" /> as intestate.</p>
                            
                            <p><strong>2.</strong> I say that I am aware that the Petitioner abovenamed is filing and/or has filed a Petition for Letters of Administration to the property and credits of the deceased abovenamed in his capacity as the <select class="border bg-[#334155] text-white p-1 rounded">
                                <option value="">Select Relation</option>
                                <option value="Widow">Widow</option>
                                <option value="Widower">Widower</option>
                                <option value="Son">Son</option>
                                <option value="Daughter">Daughter</option>
                                <option value="Mother">Mother</option>
                                <option value="Father">Father</option>
                                <option value="Brother">Brother</option>
                                <option value="Sister">Sister</option>
                            </select> of the deceased, in this Hon'ble Court.</p>
                            
                            <p><strong>3.</strong> I being the <select class="border bg-[#334155] text-white p-1 rounded">
                                <option value="">Select Relation</option>
                                <option value="Mother">Mother</option>
                                <option value="Father">Father</option>
                                <option value="Son">Son</option>
                                <option value="Daughter">Daughter</option>
                                <option value="Brother">Brother</option>
                                <option value="Sister">Sister</option>
                                <option value="Wife">Wife</option>
                                <option value="Husband">Husband</option>
                            </select> of the above named deceased do hereby give my full and free consent in favour of the above named Petitioner and pray that the Letters of Administration may be granted in her favour without service of any Citation/Notice upon me and without any surety being justified in the estate left by the deceased abovenamed.</p>
                        </div>
                        
                        <div class="mt-8 flex justify-between">
                            <div>
                                <p class="mb-4">Solemnly affirmed at <input type="text" placeholder="Enter Place" class="border bg-[#334155] text-white p-1 rounded" /></p>
                                <p>Dated this <input type="text" placeholder="Day" class="border bg-[#334155] text-white p-1 rounded w-16" /> day of <input type="text" placeholder="Month" class="border bg-[#334155] text-white p-1 rounded w-24" />, <input type="text" placeholder="Year" class="border bg-[#334155] text-white p-1 rounded w-20" /></p>
                            </div>
                            <div class="text-right">
                                <div class="w-48 h-16 border-2 border-dashed border-white flex items-center justify-center mb-2">
                                    <span class="text-sm">Signature</span>
                                </div>
                                <p class="text-sm">Consenting Party</p>
                            </div>
                        </div>
                    </div>
                `;
                
                affidavitsContainer.appendChild(newAffidavit);
                affidavitCounter++;
                
                // Add event listener to the remove button
                const removeBtn = newAffidavit.querySelector('.remove-affidavit');
                removeBtn.addEventListener('click', function() {
                    newAffidavit.remove();
                });
            });
        } else {
            console.log('Elements not found, will retry in 1 second...');
            // Retry after a short delay
            setTimeout(setupPage7Events, 1000);
        }
    }

