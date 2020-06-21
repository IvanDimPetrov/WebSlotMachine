using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SlotMachinesLibrary.SlotMachines.Abstracts;
using SlotMachinesLibrary.SlotMachines.Models;
using UltimateSlotMachine.ViewModels;

namespace UltimateSlotMachine.Controllers
{
    [Route("api/[controller]")]
    public class BedeGameController : Controller
    {
        private SlotMachine _slotMachine;

        public BedeGameController(SlotMachine slotMachine)
        {
            this._slotMachine = slotMachine;
        }

        [HttpGet("[action]")]
        public ActionResult SpinAgain()
        {
          
            this._slotMachine.Spin();

            var viewModel = GetGameViewModel();

            return Ok(viewModel);
        }

        [HttpPost("[action]")]   
        public ActionResult<SlotMachineCurrentState> StartGame([FromBody]SetupGameModel setupModel)
        {
            if(!this.ModelState.IsValid)
                return this.BadRequest(setupModel);


            if (setupModel.StackAmount > setupModel.Deposit)
                return this.BadRequest(setupModel);

            this._slotMachine.Deposit = setupModel.Deposit;
            this._slotMachine.StakeAmount = setupModel.StackAmount;

            this._slotMachine.Spin();

            var viewModel = GetGameViewModel();
 
            return Ok(viewModel);
        }

        private ViewGameModel GetGameViewModel()
        {
            var currentState = this._slotMachine.GetCurrentState();

            var model = new ViewGameModel()
            {
                Deposit = currentState.Deposit,
                WinniningAmount = currentState.CurrentWiningAmount,
                PayLines = currentState.Paylines
                                        .Select(x => x.GetAllSlots())
                                        .Select(x => string.Join("|", x.Select(y => y.Value)))
            };

            return model;
        }
    }
}